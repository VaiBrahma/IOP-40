import './App.css'
import { Provider } from 'react-redux';
import Background from './components/background/Background'
import store from './redux/store';
import FDLF from './pages/fdlf/FDLF';
import TSA from './pages/tsa/TSA';

function App() {

  return (
    <Provider store={store}>
      <Background/>
      {/* <FDLF/> */}
      <TSA/>
      <div className="empty"></div>
    </Provider>
  )
}

export default App
