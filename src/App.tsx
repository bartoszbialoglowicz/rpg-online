import { useContext, useEffect, useState } from 'react';
import './App.css';
import LoginPage from './components/Auth/AuthPage';
import { UserContext } from './store/user-context';
import Layout from './components/Layout/Layout';
import AuthPage from './components/Auth/AuthPage';

function App() {
  const userCtx = useContext(UserContext);

  const content = userCtx.isAuthenticated ? <Layout /> :<AuthPage />;
  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
