import BusData from "../../components/busData/BusData"
import LineData from "../../components/lineData/LineData"
import Navbar from "../../components/navbar/Navbar"
import RunButton from "../../components/runButton/RunButton"

const FDLF = () => {
  return (
    <div>
        <Navbar title1 = {"IOP-40: Fast Decoupled Power Flow"} title2 = {"IOP-40: FDLF"}/>
        <BusData/>
        <LineData/>
        <RunButton/>
    </div>
  )
}

export default FDLF