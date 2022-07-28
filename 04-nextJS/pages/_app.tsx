import type {AppProps} from 'next/app'
import {mainColor} from "../styles/variables";
import '../styles/globals.css';
import Layout from "./layout";

// next.js 는 html 형식의 문서 변환이 되어 나오기 때문에 , js 가 로딩이 되지 않더라도 레이아웃을 보여준다.
// Hydration - 빈 DOM 을 사용 하는것이 아닌 컴포넌트가 HTML 로 렌더링 된 후 빌드된 기존 DOM 에다 렌더링을 시키는 것.

// CustomApp ( 필수는 아님 )  Next JS 내부 페이지를 렌더링 하기 위한 템플릿 설정.

// 일반적인 css 파일의 경우는 CustomApp 파일에서만 적용이 가능 ( 나머지는 .module 이 붙어야 한다. )
// global 하게 import 해야 하는 경우가 많다 . (ga , 검색엔진 , 스크립트 분석 등 )

export default function App({Component, pageProps}: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <style jsx global>{` // next.js 내장 기능으로 style 태그를 사용 하면 css 적용.
      // global 해당 컴포넌트 하위 요소들에게 까지 css 적용.
      a {
        color: ${mainColor};
      }
      `}</style>
    </Layout>
  )
}