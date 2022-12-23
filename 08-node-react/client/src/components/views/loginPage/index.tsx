import React, {FormEvent, useCallback} from 'react';
import './loginPage.css';
import useInput from "../../../hooks/useInput";

const LoginPage = () => {
  const {onChange, inputs} = useInput({email: '', password: ''});
  const {email, password} = inputs;

  const onsubmitHandler = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <div className={'wrap'}>
      <form onSubmit={onsubmitHandler} className={'login-form'}>

        <label htmlFor="{'input-email'}">Email</label>
        <input type="email" name={'email'} id={'input-email'} value={email}
               onChange={onChange}/>

        <label htmlFor="{'input-password'}">Password</label>
        <input type="password" name={'password'} id={'input-password'} value={password}
               onChange={onChange}/>

        <button type={'submit'}>
          Login
        </button>


      </form>
    </div>
  );
};

export default LoginPage;
