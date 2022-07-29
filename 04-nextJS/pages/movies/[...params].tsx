// url 의 변수를 받는 방법 [변수명].tsx
//catch-all url [...변수명].tsx

import Seo from "../../components/seo";
import {useRouter} from "next/router";
import { InferGetServerSidePropsType , GetServerSidePropsContext} from 'next'

type MovieDetailParams = [string, string] | [];

const Detail = ({params}: InferGetServerSidePropsType< typeof getServerSideProps>) => {
  const router = useRouter();
  //router.query.params 도 server 에 넣어주지 않으면 error 가 생긴다.
  const [title, id] = (params || []) as MovieDetailParams;
  console.log(params)
   // const [title, id] = (router.query.params || []) as MovieDetailParams;
  return (
    <div>
      <Seo title={title as string} />
      <h4>{title}</h4>
    </div>
  )
}
export default Detail;


export const getServerSideProps = (context: GetServerSidePropsContext) => {
  return { props: { params: context.query.params } };
};