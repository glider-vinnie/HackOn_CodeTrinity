// App.jsx
import React, { useState } from 'react';
import AuthPage from './AuthPage';
import HomePage from './HomePage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? (
    <HomePage onLogout={() => setIsLoggedIn(false)} />
  ) : (
    <AuthPage onLogin={() => setIsLoggedIn(true)} />
  );
};

export default App;
