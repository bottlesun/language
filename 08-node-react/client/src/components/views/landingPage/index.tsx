import axios from "axios";
import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Auth from "../../../hoc/auth";
import './landingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();


  useEffect(() => {
    axios.get('/api/hello')
      .then(response => console.log(response));
  }, [])

  const onClickHandler = () => {
    axios.get('/api/user/logout')
      .then(res => {
        if (res.data.success) {
          navigate('/login')
        } else {
          alert('로그아웃을 할 수 없습니다.')
        }
      });
  }

  return (
    <div className={'wrap'}>
      <h2>시작페이지</h2>

      <button onClick={onClickHandler}>
        로그아웃
      </button>
    </div>
  );
};

export default Auth(LandingPage, null)
