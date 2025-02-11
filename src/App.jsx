import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Background from "./components/background/Background.jsx";
import store from "./redux/store";
import FDLF from "./pages/fdlf/FDLF.jsx";
import TSA from "./pages/tsa/TSA.jsx";
import Home from "./pages/home/Home.jsx";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Background />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fdlf" element={<FDLF />} />
          <Route path="/tsa" element={<TSA />} />
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;