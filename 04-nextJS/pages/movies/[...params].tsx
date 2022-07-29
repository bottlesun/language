// url 의 변수를 받는 방법 [변수명].tsx

//catch-all url [...변수명].tsx
//

import {useRouter} from "next/router";
import {NextPage, NextPageContext } from "next";
import Seo from "../../components/seo";


const Detail = ({parmas}) => {
  const router = useRouter();
  //router.query.params 도 server 에 넣어주지 않으면 error 가 생긴다.
  const [title , id]= parmas || [];
  // const [title , id]= router.query.params || [];

  return (
    <div>
      <h4>
        <Seo title={title}/>
        {title}
      </h4>
    </div>
  )
}

export default Detail;


export  function getServerSideProps({params: {params}} ) { // ctx 에서 의 params 를 가지고 온다.
  return {
    props : {
      params
    },
  };
};