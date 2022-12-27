// Business Logic
// BusinessComponent.tsx

import {ChangeEvent, FormEvent} from "react";
import useInput from "../../../hooks/useInput";
import {ViewComponent} from './viewComponent'

export interface VAC<T> {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onSubmitHandler: (event: FormEvent<HTMLFormElement>) => void
  Email: T,
  Password: T,
  Name: T,
  ConfirmPassword: T
}


export const BusinessComponent = () => {
  const {onChange, inputs} = useInput({Email: '', Password: '', Name: '', ConfirmPassword: ''});
  const {Email, Password, Name, ConfirmPassword} = inputs;

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  }

  const props = {
    onSubmitHandler,
    onChange,
    Email, Password, Name, ConfirmPassword
  }

  // rendering 부분은 VAC 가 담당하기에 props 부분만 작업 하고 신경쓴다.

  return <ViewComponent {...props} />
};