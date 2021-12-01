import './App.sass';
import MainPage from './components/mainPage/mainPage';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <MainPage />
      </div>
    </Provider>
  );
}

export default App;
