import './App.css'
import Background from './components/Background/Background'
import BusData from './components/busData/BusData'
import LineData from './components/lineData/LineData'
import Navbar from './components/navbar/Navbar'

function App() {

  return (
    <>
      <Background/>
      <Navbar/>
      <BusData/>
      <LineData/>
      <div className="empty"></div>
    </>
  )
}

export default App
