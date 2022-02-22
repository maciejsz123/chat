import './App.sass';
import MainPage from './components/mainPage/mainPage';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app">
          <MainPage />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
