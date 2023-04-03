import { useState } from 'react';
import './App.css';
import LoginPage from './components/Auth/AuthPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const content = !isAuthenticated ? <LoginPage /> : <p>Zalogowano.</p>
  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
