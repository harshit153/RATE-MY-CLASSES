import React from 'react';
import TopBar from './TopBar';
import Reviews from './Reviews';
import { LoginForm } from '../Login/LoginForm';



const ReviewPage = ({currentUser, setCurrentUser}) => {
  if(!localStorage.getItem('token')) {
    return <LoginForm/>
  } else {
  }
    return (
      <div>
      <TopBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Reviews />
      </div>
    );
  };

  export default ReviewPage