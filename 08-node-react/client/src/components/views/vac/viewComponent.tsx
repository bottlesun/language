import React from "react";
import {VAC} from "./businessComponent";

export const ViewComponent = ({onSubmitHandler, onChange, Email, Password, Name, ConfirmPassword}: VAC<string>) => (

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