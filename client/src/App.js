import React from "react";
import './App.css';
import Navigation from './components/navigation';

const App = () => {
  const user = {account_id: 1}
  return (
    <Navigation user={user} />
  );
}

export default App;
