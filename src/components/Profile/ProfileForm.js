import {useRef, useContext} from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../Source/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();

  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventdefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    // validation can be added here but its not the focus of this unit

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBYJHtwS0WTina0sStScP14mKZQBwIMpPw', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false 
      }),
      headers: {
        'Content-Type': 'application/json'
      } 
    }).then(res => {
      // making an assaumption that this always succeeds

      history.replace('/');
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
