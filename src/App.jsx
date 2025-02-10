import './App.css'
import { Provider } from 'react-redux';
import Background from './components/Background/Background'
import BusData from './components/busData/BusData'
import LineData from './components/lineData/LineData'
import Navbar from './components/navbar/Navbar'
import YMatrix from './components/yMatrix/YMatrix'
import store from './redux/store';

function App() {

  const handleClick = () => {
    
  }

  return (
    <Provider store={store}>
      <Background/>
      <Navbar/>
      <BusData/>
      <LineData/>
      <div className="btn runbtn" onClick={handleClick}>Run Power Flow</div>
      {/* <YMatrix/> */}
      <div className="empty"></div>
    </Provider>
  )
}

export default App
