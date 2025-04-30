import Angle from "./angle/Angle";
import AngleHistograms from "./histograms/AngleHistograms";
import LineFlowHistograms from "./histograms/LineFlowHistograms";
import VoltageHistograms from "./histograms/VoltageHistograms";
import LineFlow from "./lineFlow/LineFlow";
import Voltage from "./voltage/Voltage";

const Results = () => {
  return (
    <div className="py-10">
        <h1 className="  font-black text-4xl text-center border-b-2 p-4 mb-5">Stochastic Results</h1>
        {/* <h1 className="text-center">BoxPlot</h1> */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mx-5 mt-10">
            <Voltage/>
            <Angle/>
            <LineFlow/>
        </div>
        {/* <h1 className="text-2xl text-center p-4">Voltage Histograms + PDFs</h1> */}
        <VoltageHistograms/>
        {/* <h1 className="text-2xl text-center p-4">Angle Histograms + PDFs</h1> */}
        <AngleHistograms/>
        {/* <h1 className="text-2xl text-center p-4">Line Flow Histograms + PDFs</h1> */}
        <LineFlowHistograms/>
    </div>
  );
};

export default Results;