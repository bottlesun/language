import {ChangeEvent, useState, useCallback} from 'react';

interface ReturnType<T> {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  inputs: T
}

export default function useInput<T>(initialData: T): ReturnType<T> {

  const [inputs, setInputs] = useState(initialData);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {

    const {value, name} = e.target;

    setInputs(
      {
        ...inputs,
        [name]: value
      }
    )
  }, [inputs]);
  return {onChange, inputs}

}