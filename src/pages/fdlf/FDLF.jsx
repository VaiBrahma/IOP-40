import Navbar from "../../components/navbar/Navbar"
import BusData from "../../components/fdlf/busData/BusData"
import LineData from "../../components/fdlf/lineData/LineData"
import RunButton from "../../components/fdlf/runButton/RunButton"

const FDLF = () => {
  return (
    <div>
        <Navbar title1 = {"IOP-40: Fast Decoupled Load Flow"} title2 = {"IOP-40: FDLF"}/>
        <BusData/>
        <LineData/>
        <RunButton/>
    </div>
  )
}

export default FDLF