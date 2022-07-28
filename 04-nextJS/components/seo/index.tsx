import Head from "next/head";

// head (seo) component 를 개인화 해서 쓸 수 있다. Meta , Description , info , tag
// next/head - nextJS 지원 기능   ( react-helmet 비슷한 기능 )

interface CustomHeadInterface{
  title : string;
}

export default function Seo({title}:CustomHeadInterface)  {
  return <Head>
    <title>{title} | Next Movies</title>
  </Head>
}