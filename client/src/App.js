
import Layouts from './layouts/Layouts';
import Signup from './screens/Signup';
import Login from './screens/Login';
import MainContainer from './containers/MainContainer';
import {
  loginUser,
  registerUser,
  removeToken,
  verifyUser,
} from './services/auth';

import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();
  const [err, setError] = useState(false)

  useEffect(() => {
    const handleVerify = async () => {
      const userData = await verifyUser();
      setCurrentUser(userData);
    };
    handleVerify();
  }, []);

  const handleSignup = async (formData) => {
    try {
      const userData = await registerUser(formData);
      setCurrentUser(userData);
      setError(false)
      history.push('/products');
    } catch (error) {
      setError(true)
    }
  };

  const handleLogin = async (formData) => {
    try {
      const userData = await loginUser(formData);
      setCurrentUser(userData);
      history.push('/products');
      setError(false)
    } catch (error) {
      setError(true)
    }

  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authToken');
    removeToken();
    history.push('/')
  };


  return (
    <div className="App">
      <Layouts handleLogout={handleLogout} currentUser={currentUser}>
        <Switch>

          <Route path='/login'>
            <Login handleLogin={handleLogin} err={err} />
          </Route>
          <Route path='/signup'>
            <Signup handleSignup={handleSignup} err={err} />
          </Route>
          <Route path='/'>
            <MainContainer currentUser={currentUser} />
          </Route>
        </Switch>
      </Layouts>
    </div>
  );
}

export default App;
