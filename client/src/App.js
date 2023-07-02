import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {LoginForm} from './Components/Login/LoginForm';
import ReviewPage from './Components/ReviewPage/ReviewPage';
import RegistrationPage from './Components/Registration/Registration';
import { useState } from 'react';



const App = () => {
  const [currentUser, setCurrentUser] = useState('');
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
          <Route path="/rate" element={<ReviewPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
