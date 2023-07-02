import React from 'react';
import { useEffect } from 'react';
import { createStyles} from '@mantine/core';
import { RatePagelogo } from '../../images/RatePageLogo';
import { Link } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const useStyles = createStyles((theme, _ref) => ({
    topBar: {
        backgroundColor: '#1877f2',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 15px',
      },
      websitename: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: '20px',
        fontWeight: 'bold',
        marginLeft: '25px',
      },
      userInfo: {
        display: 'flex',
        alignItems: 'center',
      },
      username: {
        marginRight: '20px',
        minWidth: '40px',
        minHeight: '40px',
        borderRadius: '5px',
        padding: '10px 10px',
        fontSize: '15px',
        fontFamily: 'Arial. sans-serif',
      },
      logout: {
        padding: '10px 10px',
        backgroundColor: 'red',
        fontWeight: 'bold',
        cursor: 'pointer',
        color: '#ffffff',
        borderRadius: '5px',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    }));

      
        


const TopBar = ({ currentUser, setCurrentUser }) => {

  useEffect(() => {
    if(currentUser) {
      localStorage.setItem('username', currentUser);
    } else {
    const savedUsername = localStorage.getItem('username');
    console.log(savedUsername)
    if (savedUsername) {
      setCurrentUser(savedUsername);
      localStorage.setItem('username', savedUsername);
    }
  }

  }, []);


    const { classes } = useStyles();
    const logout = () => {
      localStorage.removeItem("whpf_user")
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('sessionData');
      localStorage.removeItem('userPreferences');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('username');
      setCurrentUser('');
    }
    
  return (
    <div className={classes.topBar}>
      <div className= {classes.websitename}>
      <h3> Rate<span style={{color: 'lightgreen'}}>My</span>Classes</h3>
      <RatePagelogo/>
      </div>
      <div className={classes.userInfo}>
        <button id = 'usernameInput' className={classes.username}><FontAwesomeIcon icon={faUser} className={classes.deleteIcon}/> {currentUser} </button>
        <Link onClick={logout} to="/" className={classes.logout}>Logout</Link>
      </div>
    </div>
  );
};

export default TopBar;