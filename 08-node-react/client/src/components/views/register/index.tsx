import React, {FormEvent} from 'react'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../../../_actions/user_actions";
import Auth from "../../../hoc/auth";
import useInput from "../../../hooks/useInput";
import '../loginPage/loginPage.css';


const Register = () => {
  const navigate = useNavigate();

  const {onChange, inputs} = useInput({Email: '', Password: '', Name: '', ConfirmPassword: ''});
  const {Email, Password, Name, ConfirmPassword} = inputs;
  const dispatch = useDispatch() as any;

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    let body = {
      email: Email,
      name: Name,
      password: Password,
      confirmPassword: ConfirmPassword,
    }

    if (Password !== ConfirmPassword) return alert('비밀번호 가 다릅니다.');

    dispatch(registerUser(body))
      .then((response: any) => {
        console.log(response.payload)
        if (response.payload?.seccess) {
          navigate('/login')
        } else {
          alert('Failed to sign up!')
        }
      })
  }

  return (
    <div className={'wrap'}>
      <form onSubmit={onSubmitHandler} className={'login-form'}>

        <label htmlFor="{'input-email'}">Email</label>
        <input type="email" name={'Email'} id={'input-email'} defaultValue={Email}
               onChange={onChange}/>

        <label htmlFor="{'input-name'}">Name</label>
        <input type="text" name={'Name'} id={'input-name'} defaultValue={Name} onChange={onChange}/>

        <label htmlFor="{'input-password'}">Password</label>
        <input type="password" name={'Password'} id={'input-password'} defaultValue={Password}
               onChange={onChange}/>

        <label htmlFor="{'input-ConfirmPassword'}">Confirm Password</label>
        <input type="password" name={'ConfirmPassword'} id={'input-ConfirmPassword'} defaultValue={ConfirmPassword}
               onChange={onChange}/>

        <button type={'submit'}>
          Login
        </button>


      </form>
    </div>
  );
};

export default Auth(Register, false);
