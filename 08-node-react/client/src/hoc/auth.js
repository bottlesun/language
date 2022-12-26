import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {auth} from "../_actions/user_actions";
import {useNavigate} from "react-router-dom";

const Auth = (SpecificComponent, option, adminRoute = null) => {
  // hoc 부분 내용 재정리 필요 - https://www.youtube.com/watch?v=nxEU0WUQprc&list=PL9a7QRYt5fqkZC9jc7jntD1WuAogjo_9T&index=34
  // null => 아무나 출입이 가능한 페이지
  // true => 로그인한 유저만 출입이 가능한 페이지
  // false => 로그인한 유저는 출입이 불가능한 페이지

  function AuthenticationCheck(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((res) => {
        console.log(res);
        // 분기처리

        // 로그인 x
        if (!res.payload.isAuth) {
          navigate('/login');
        } else {
          // 로그인 한 상태 ( 관리자 일때)
          if (adminRoute && !res.payload.isAdmin) {
            return navigate('/');
          } else {
            if (option === false) return navigate('/');
          }

        }

      });

    }, []);

    return <SpecificComponent/>;
  }

  return AuthenticationCheck;
};
export default Auth;