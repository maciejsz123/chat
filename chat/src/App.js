import './App.sass';
import MainPage from './components/mainPage/mainPage';
import LoginForm from './components/loginForm/loginForm';

function App() {
  const logged = true;
  return (
    <div className="app">
      {logged ? <MainPage /> : <LoginForm />}
    </div>
  );
}

export default App;
