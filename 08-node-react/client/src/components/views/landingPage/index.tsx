import axios from "axios";
import React, {useEffect} from 'react';
import './landingPage.css';

const LandingPage = () => {
  useEffect(() => {
    axios.get('/api/hello')
      .then(response => console.log(response));
  }, [])
  return (
    <div className={'wrap'}>
      <h2>시작페이지</h2>
    </div>
  );
};

export default LandingPage;
