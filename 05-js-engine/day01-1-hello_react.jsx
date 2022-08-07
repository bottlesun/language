import {useㅊAllback} from 'react';

export const App = () => {
  const onClick = useCallback((e) => {
    console.log(e.target);
  },[]);

  return (
    // <div onClick={onClick()}></div> // x
    <div onClick={onClick}></div> // o 매게변수를 넣지않아서, 함수호출 값이 아닌 함수선언을 넣어줘야한다.
  )
}