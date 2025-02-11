import './App.css'
import { Provider } from 'react-redux';
import Background from './components/background/Background'
import BusData from './components/busData/BusData'
import LineData from './components/lineData/LineData'
import Navbar from './components/navbar/Navbar'
import store from './redux/store';
import RunButton from './components/runButton/RunButton';

function App() {

  return (
    <Provider store={store}>
      <Background/>
      <Navbar/>
      <BusData/>
      <LineData/>
      <RunButton/>
      <div className="empty"></div>
    </Provider>
  )
}

export default App
