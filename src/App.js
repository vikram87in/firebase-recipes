import './App.css';
import './FirebaseConfig';
import FirebaseAuthService from './FirebaseAuthService';
import LoginForm from './components/LoginForm';
import { useEffect, useState } from 'react';



function App() {

  const [user, setUser] = useState(null);
  useEffect(() => {
    FirebaseAuthService.subscribeToAuthChanges(setUser);
  }, []);
  return (
    <div className="App">
      <div className='App'>
        <div className='title-row'>
          <h1 className='title'>Firebase Recipes</h1>
          <LoginForm user={user} />
        </div>
      </div>
    </div>
  );
}

export default App;
