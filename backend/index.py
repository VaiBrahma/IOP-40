from flask import Flask, jsonify
import numpy as np

app = Flask(__name__)

@app.route('/simulate', methods=['GET'])
def run_stochastic_fdlf():
    linedata = np.array([
        [1, 2, 0.02, 0.06, 0.03],
        [1, 3, 0.08, 0.24, 0.025],
        [2, 3, 0.06, 0.18, 0.02],
        [2, 4, 0.06, 0.18, 0.02],
        [2, 5, 0.04, 0.12, 0.015],
        [3, 5, 0.01, 0.03, 0.01],
        [4, 5, 0.08, 0.24, 0.025],
    ])

    base_busdata = np.array([
        [1, 1, 1.06, 0,    0,   0,   0,    0,   0,   0],
        [2, 2, 1.045, 0,  0.4, 0.25, 0.2,  0.1, 0.5, -0.4],
        [3, 2, 1.01,  0,  0.6, 0.3,  0.25, 0.1, 0.6, -0.4],
        [4, 3, 1.0,   0,  0,   0,    0.4,  0.2, 0,   0],
        [5, 3, 1.0,   0,  0,   0,    0.5,  0.25,0,   0],
    ])

    n_samples = 500
    nbus = base_busdata.shape[0]
    nline = linedata.shape[0]

    V_samples = np.full((nbus, n_samples), np.nan)
    delta_samples = np.full((nbus, n_samples), np.nan)
    Pline_samples = np.full((nline, n_samples), np.nan)
    success_count = 0

    Ybus_fixed = create_ybus(linedata, nbus)

    for k in range(n_samples):
        busdata = base_busdata.copy()

        randP = 1 + 0.1 * (2 * np.random.rand(nbus) - 1)
        randQ = 1 + 0.1 * (2 * np.random.rand(nbus) - 1)

        load_buses = (base_busdata[:, 1] == 3) | (base_busdata[:, 6] > 0)
        busdata[load_buses, 6] *= randP[load_buses]
        busdata[load_buses, 7] *= randQ[load_buses]

        V, delta, success = fdlf_solver(busdata, linedata)
        if success:
            V_samples[:, k] = V
            delta_samples[:, k] = np.rad2deg(delta)
            Pline_samples[:, k] = compute_line_flows(V, delta, linedata, Ybus_fixed)
            success_count += 1

    return jsonify({
        "V_samples": V_samples.tolist(),
        "delta_samples": delta_samples.tolist(),
        "Pline_samples": Pline_samples.tolist(),
        "success_rate": 100 * success_count / n_samples
    })


def create_ybus(linedata, nbus):
    Ybus = np.zeros((nbus, nbus), dtype=complex)
    for row in linedata:
        i, j = int(row[0]) - 1, int(row[1]) - 1
        R, X, B = row[2], row[3], row[4]
        y = 1 / complex(R, X)
        Ybus[i, i] += y + 1j * B / 2
        Ybus[j, j] += y + 1j * B / 2
        Ybus[i, j] -= y
        Ybus[j, i] -= y
    return Ybus


def fdlf_solver(busdata, linedata):
    nbus = busdata.shape[0]
    bus_type = busdata[:, 1]
    V = busdata[:, 2].copy()
    delta = np.deg2rad(busdata[:, 3])
    Pg, Qg, Pl, Ql = busdata[:, 4], busdata[:, 5], busdata[:, 6], busdata[:, 7]
    Qgmax, Qgmin = busdata[:, 8], busdata[:, 9]
    P = Pg - Pl
    Q = Qg - Ql

    PQ = np.where(bus_type == 3)[0].tolist()
    PV = np.where(bus_type == 2)[0].tolist()
    Slack = np.where(bus_type == 1)[0].tolist()

    Ybus = create_ybus(linedata, nbus)
    Bprime = -Ybus.imag
    Bprime = np.delete(Bprime, Slack, axis=0)
    Bprime = np.delete(Bprime, Slack, axis=1)

    Bdoubleprime = -Ybus.imag
    Bdoubleprime = Bdoubleprime[np.ix_(PQ, PQ)]

    tol = 1e-6
    max_iter = 20

    for _ in range(max_iter):
        P_calc = np.zeros(nbus)
        Q_calc = np.zeros(nbus)
        for i in range(nbus):
            for k in range(nbus):
                angle = delta[i] - delta[k]
                G, B = Ybus[i, k].real, Ybus[i, k].imag
                P_calc[i] += V[i] * V[k] * (G * np.cos(angle) + B * np.sin(angle))
                Q_calc[i] += V[i] * V[k] * (G * np.sin(angle) - B * np.cos(angle))

        PV_copy = PV.copy()
        for bus in PV_copy:
            Qg_actual = Q_calc[bus] + Ql[bus]
            if Qg_actual > Qgmax[bus]:
                Q[bus] = Qgmax[bus] - Ql[bus]
                PV.remove(bus)
                if bus not in PQ:
                    PQ.append(bus)
            elif Qg_actual < Qgmin[bus]:
                Q[bus] = Qgmin[bus] - Ql[bus]
                PV.remove(bus)
                if bus not in PQ:
                    PQ.append(bus)

        Bprime = -Ybus.imag
        Bprime = np.delete(Bprime, Slack, axis=0)
        Bprime = np.delete(Bprime, Slack, axis=1)
        Bdoubleprime = -Ybus.imag
        Bdoubleprime = Bdoubleprime[np.ix_(PQ, PQ)]

        non_slack = [i for i in range(nbus) if i not in Slack]
        dP = P[non_slack] - P_calc[non_slack]
        dQ = Q[PQ] - Q_calc[PQ]

        if np.max(np.abs(np.concatenate((dP, dQ)))) < tol:
            return V, delta, True

        delta_update = np.linalg.solve(Bprime, dP)
        for idx, i in enumerate(non_slack):
            delta[i] += delta_update[idx]

        V_update = np.linalg.solve(Bdoubleprime, dQ)
        for idx, i in enumerate(PQ):
            V[i] += V_update[idx]

    return V, delta, False


def compute_line_flows(V, delta, linedata, Ybus):
    nline = linedata.shape[0]
    P_line = np.zeros(nline)
    for k in range(nline):
        i, j = int(linedata[k, 0]) - 1, int(linedata[k, 1]) - 1
        G = Ybus[i, j].real
        B = Ybus[i, j].imag
        angle = delta[i] - delta[j]
        P_line[k] = V[i]**2 * G - V[i]*V[j]*(G*np.cos(angle) + B*np.sin(angle))
    return P_line


if __name__ == '__main__':
    app.run(debug=True)