import { useContext, useState } from 'react';
import './App.css';
import LoginPage from './components/Auth/AuthPage';
import { UserContext } from './store/user-context';
import Layout from './components/Layout/Layout';

function App() {
  const userCtx = useContext(UserContext);

  const content = !userCtx.isAuthenticated ? <LoginPage /> : <Layout />
  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
