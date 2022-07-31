# NEXT JS Study

---
* day | 22.07.28 ~ 22.07.31
* [Study | 노마드코더 강의](https://nomadcoders.co/nextjs-fundamentals/lobby)
* [git](https://github.com/bottlesun/language/tree/main/04-nextJS)

---

## Next JS 특징

React 라이브러리의 프레임워크 이다.

**Next.js** 는 SPA와 SSR의 단점을 해결하기 위해서 리액트에 서버 사이드 렌더링(SSR) 기능을 더하여 SPA와 SSR의 장점을 가질 수 있게 됩니다.

### • [작동 원리] - (SSR)

> 1. Hydration - 빈 DOM 을 사용 하는것이 아닌 컴포넌트가 HTML 로 렌더링 된 후 빌드된 기존 DOM 에다 렌더링을 시키는 것.
>
>
> 2. 브라우저에서 JavaScript를 다운로드하고 React를 실행함.
>
> 3.사용자, 페이지가 서로 상호 작용하여 다른 페이지로 이동할 땐, Server가 아닌 CSR방식으로 브라우저에서 처리함.
>

### • ****SEO 검색 엔진 최적화 (Search Engine Optimiztion)****

> 1. 검색 엔진 봇 들은 사이트의 데이터를 크롤링할 때, JavaScript 파일을 해석할 수 없다는 특징을 가졌다. 때문에 HTML 파일에서 크롤링을 하게 된다.
>
>
>  * CSR 방식은 JS를 읽어와 페이지를 구성해주기 전까지 HTML에 아무것도 없으므로 데이터를 수집 할 수 없는 상태이기에 검색 엔진 노출이 어려운 편
>

### • Hot Module Replacement를 지원하는 개발 환경

> HMR은 브라우저를 새로 고치지 않아도 Webpack으로 빌드한 결과물이 웹 애플리케이션에 실시간으로 반영될 수 있게 도와주는 설정을 말한다.
>

### • ****코드 분할(Code Splitting) 자동화****

> 코드 분할은 Lazy Loding(지연 로딩)을 할 수 있게 도와주고, 코드 양을 줄이지 않고도 필요하지 않은 코드를 불러오지 않게 하여 초기 로딩에 필요한 Resource(자원)을 줄여준다. 쉽게 정리하면, Bundling 된 파일을 분할해서 로드하여 초기 구동 속도를 빠르게 하고 사용자들에게도 눈에 띄는 성능 향상 시킨다.
>

---
## 사용 방법

모든 설정을 직접 하는 경우도 있겠지만 create-next-app 을 사용 했다.

```bash
npx create-next-app@latest --typescript
# or
yarn create next-app --typescript
# or
pnpm create next-app --ts
```

[ 폴더 파일구조 ]
```text
pages // 페이지를 담당하는 컴포넌트(폴더구조로 url이 나타난다.)
　　⎿ api       // 서버와의 통신로직 담당 폴더
　　　　⎿ hello.ts
　　⎿ _app.tsx  // CustomAPP // 각 페이지별로 공통적으로 쓰는 부분 리펙토링 해준다.
　　⎿ index.tsx // 메인페이지 
public
　　⎿ favicon.ico
　　⎿ vercel.svg
styles  // 스타일 관련 폴더
　　⎿ globals.css
　　⎿ Home.module.css

.eslintrc.json
.gitignore
next.config.ts
next-env.d.ts
package.json
README.md
tsconfig.json
```

[ package.json ]
```json
// package.json

{
  "name": "test-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "12.2.3",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "@types/node": "18.6.2",
    "@types/react": "18.0.15",
    "@types/react-dom": "18.0.6",
    "eslint": "8.20.0",
    "eslint-config-next": "12.2.3",
    "typescript": "4.7.4"
  }
}
```
많은 기능들이 들어 있음에도  package.json 의 파일 내용이 적다는 게 특징이다.


[ pages ]

NextJS 에서 각 페이지를 담당하는 컴포넌트로 페이지의 URL 구조도 담당한다.
```text
pages
　　⎿ about      // /about
　　　　⎿ index.tsx
　　⎿ _app.tsx
　　⎿ index.tsx  // /

```
[ index.tsx ]
```typescript
import Seo from '../components/seo'

export default function Home() {

  return (
    <div>
      <Seo title="Home" /> {{<!-- 페이지별 중복 컴포넌트 -->}}
      <h1>Hello</h1>


      <style jsx >{` // css in js 기본 적용
      // 해당 컴포넌트 에서 적용 하는 css 는 해당 컴포넌트 하위 요소들에게 까지 밖에 적용 안된다.
	    // 다른 pages 속 폴더에 적용 x
      a {
        color: #fff ;
      }
      `}</style>

    </div>
  )
}
```

[ CustomAPP |  _app.tsx ]

Next JS 내부 페이지를 렌더링 하기 위한 템플릿 설정이다.

global 하게 import 해야 하는 경우가 많다 . (ga , 검색엔진 , 스크립트 분석 등 )

특징으로는 일반적인 css 파일의 경우는 CustomApp 파일에서만 적용이 가능 ( 나머지는 .module 이 붙어야 한다. )

```typescript
import type {AppProps} from 'next/app'
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
        color: #fff;
      }
      `}</style>
    </Layout>
  )
}
```

[ Layout ]

페이지 간 재 사용이 되는 공통 component 를 넣어줄 때 사용 한다.

page, component들을 props 로 받아 화면에 출력해준다. ( react app.js )

CustomApp에서도 하는 작업들이 많기에, layoutComponent 를 만들어 주어 중간에서 관리를 한다.

```typescript
importNavBarfrom"../components/navBar";
importReactfrom"react";

typeAppLayoutProps = {
  children: React.ReactNode;
};

// layout
//페이지간 재사용이 되는 공통 component를 넣어줄때 사용 한다.
// page, component들을 props로 받아 화면에 출력해준다. ( react app.js )
// CustomApp에서도 하는 작업들이 많기에, layoutComponent를 만들어 주어 중간에서 관리를 한다.

export default functionLayout({children} : AppLayoutProps) {
return(
    <>
      <NavBar/>
      <div>{children}</div>
    </>
  )
}
```

[component]
재 사용이 되는 공통 컴포넌트.

크게 는 Header Footer , 작게 는 Button 이나 Modal 같이 공통적인 컴포넌트 요소를 넣어둔다.

[ SEO | Head ]
```typescript
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
```

[nevBar]
```typescript
import Link from 'next/link'
import {useRouter} from "next/router";
import {Nav} from "./navBar.styles";
// Link -react-router-dom Link 와 같은 방식. - a 태그를 겉으로 사용 하면 페이지 이동간의 reload 가 일어남 (X)
// Link 태그 에서는 css 및 className 등 설정 할 수가 없어 내부에 a 태그를 넣어 style 을 입힌다.

// useRouter() - nextJS 의 Hook 으로 location 정보를 가지고 온다.

export default function NavBar() {
  const router = useRouter();

  return (
		<Nav>
      <img src="/vercel.svg"  alt="logo" />
      <div>
        <Link href="/">
          <a className={`link , ${router.pathname === "/" ? "active" : ''}`}>Home</a>
        </Link>
        <Link href="/about">
          <a className={['link', router.pathname === "/about" ? "active" : ''].join(" ")}>About</a>
        </Link>
      </div>
    </Nav>
  )
}
```

### Rewrites | Redirects

Rewrites - 다시 쓰기를 사용하면 들어오는 요청 경로를 다른 대상 경로에 매핑할 수 있습니다.

Redirects - 리디렉션을 사용하면 들어오는 요청 경로를 다른 대상 경로로 리디렉션할 수 있습니다.

[ next.config.js ]
```typescript
/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY; // .env 파일을 만들어 옮긴 후 그 값을 가지고 와서 API KEY를 사용자에게 안보이게 만든다.

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() { //Redirects 리디렉션을 사용하면 들어오는 요청 경로를 다른 대상 경로로 리디렉션할 수 있습니다.
    // 한 페이지에서 다른페이지로 이동 할 수 있고, 다른 URL 로도 이동이 가능하다.
    return [
      {
        source : '/old-blog/:path*', // 들어오는 요청경로 패턴 ( 유저가 이동하려는 경로 )
        destination : '/new-blog/:path*', // 라우팅하려는 경로 ( 유저에게 라우팅하여 반환하는 경로)
        permanent : false , // 브라우저나 검색엔진이 정보를 기억하는 여부,
        // pattern matching - source : '/old-blog/:path ' -> destination : '/new-blog/:path' 로 설정 하면
        // path 부분은 변하지 않고 old-blog -> new-blog 값만 바뀐다. '/new-blog/:path*' 처럼 별표를 붙이면 하위 요소를 다 catch 할 수 있다.
        // 같은 페이지
      },
      {
        source : '/add-url/:path*', // 추가로 사용 하고싶으면 배열을 추가하면 된다.
        destination : '/new-add-blog/:path*',
        permanent : false ,

      },
    ]
  },
  async rewrites() { //들어오는 요청 경로를 다른 대상 경로에 매핑할 수 있습니다.
    // api 등 필요 부분 보안을 위해서도 필요한 부분
    return [
      {
        source: '/api/movies',  // 들어오는 요청 경로 패턴
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      }
    ]
  },

}

module.exports = nextConfig
```

### Fetching Data.  [[참고]](https://nextjs.org/docs/basic-features/data-fetching/overview)

Next.JS 에서의 데이터를 가지고 올때 사용 사례에 따라 다양하게 콘텐츠를 렌더링 할 수 있다.

- ****Client-side rendering | data fetching ( CSR )****

  클라이언트 측 데이터 가져오기는 페이지의 SEO 인덱싱이 필요하지 않거나 데이터를 미리 렌더링을 할 필요가 없는 경우 , 혹은 콘텐츠를 자주 업데이트 해야 할 경우에 유용하다.

  런타임에 데이터를 가져오고 데이터가 변경되면 페이지의 내용이 업데이트 된다는 특징이 있다.

  정보량이 많은 데이터를  fetching 하게 될 경우 성능과 로드 속도에 영향을 줄 수가 있다. (데이터 캐싱x)

[ index.tsx ]

```typescript
import Seo from '../components/seo'
import {useEffect, useState} from "react";
import Movie from "../interfaces/movieAPI.interface";
import axios from "axios";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => { // csr 방식 data-fetching
        (async () => {
          const {results} = await (await fetch(`/api/movies`)).json();
          setMovies(results)
          console.log(results)
        })();

/*    axios.get(`/api/movies`)
      .then((response) => {
        setMovies(response.data.results)
        console.log(response.data.results)
      }).catch((error) => {
      console.log(error)
    })*/

  }, [])

  return (
    <div className="container">
      <Seo title="Home"/>
      {!movies && <h4>Loading...</h4>}
      {movies.map((movie:Movie) => (
        <div className="movie" key={movie?.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
      ))}
    </div>
  )
}
```
- **Server-Side rendering | data fetching ( SSR )**

  넥스트에서 SSR로 data fetching  하려면,  getServerSideProps() 라는 함수를 통해 반환 된, 데이터를 사용하여 페이지를 미리 렌더링 해준다.

  getServerSideProps 는 서버에서만 실행 되고 브라우저 에서는 실행이 되지 않는다.

  클라이언트 측에서 데이터를 사용 하여 작업을 할 경우에는 ‘next / link’ 를 통해 페이지 전환을 요청하면 ,  ‘ next / router ’  로 api 를 서버에 요청 전송 한다.

[ index.tsx ]
```typescript
import Seo from '../components/seo'
import Movie from "../interfaces/movieAPI.interface";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/router";
import { GetServerSideProps , InferGetServerSidePropsType } from 'next'

// navigating -> router hook

export default function Home({results}: InferGetServerSidePropsType< typeof getServerSideProps>) {
  console.log(results)
  const router = useRouter();
  const onClick = (id: number, title: string) => {
    router.push(`/movies/${title}/${id}`);
  };

  return (
    <div className="container">
      <Seo title="Home"/>

      {results.map((movie: Movie) => (

        <div className="movie" key={movie.id} onClick={() => onClick(movie.id, movie.original_title)}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title}/>
          <Link href={`/movies/${movie.original_title}/${movie.id}`}>

            {/* a (link) 태그는  div 를 감싸는 태그가 아닌 그 이전으로 들어가야 하기때문에  text 관련 태그만만 묶어주는게 좋다. */}
            <a>
              <h4>{movie.original_title}</h4>
            </a>
          </Link>
        </div>

      ))}
    </div>
  )
}

//getServerSideProps // 서버사이드렌더링에서만 실행
//요청에 따라 페이지가 데이터를 계속 업데이트해야는 상황에 사용
// 함수이름을 바꿀 수 없다. / 안에 어떤 코드를 쓰던 server 에서만 돌아간다. ( 백엔드 에서만 돌아감 )
export const getServerSideProps  : GetServerSideProps = async () => {
  // const {results} = await (await fetch(`http://localhost:3000/api/movies`)).json(); // absolute URL만 가능
  const results = await axios.get('http://localhost:3000/api/movies')
    .then((response) => response.data.results)
    .catch((error) => console.dir(error))

  return {
    props: { // 리턴 값을 페이지 props 값으로 사용
      results,
    }
  }
}


// getServerSideProps (SSR) 를 사용 하면 page가 유저에게 보여지기전에  props를 받아오는 function()을 만들어서 화면에 뿌려준다.
// data 가 없을 경우 loading 페이지가 없지만 api load가 느릴때사용자는 빈 화면을 보고 있을 가능성이 있다.

// static shell (CSR) - 프론트 쪽에서 api를 받아 처리를 하면 api load가 느릴때 html 부분에 남는것은 loading 밖에 안보여진다. (seo 에 취약할수있음)
```

### Dynamic Routes URL [params]

nextJS 는 [pages] 폴더 안에 들어있는 하위 폴더 구조를 통해서 url 이 정해진다는 점이 특징중에 하나다.

하위 요소의 또 다른 하위 요소가 존재 할 경우에는 그 하위요소도 url 을 만들어 줄 수 있다

ex) localhost:3000/하위요소/하위요소의하위요소

미리 정의 된 정적인 경로 만으로는 복잡한  로직을 구현을 하는데 부족함이 있다.

동적인 페이지를 구현 할 수있는 경로를 설정하는 방법이다.

[ [id].tsx ]
```typescript
// url 의 변수를 받는 방법 [변수명].tsx

import {useRouter} from "next/router";

const Detail = () => {
  const router = useRouter();
  console.log(router)
  return (
    <div>
      <h4>
        {router.query.title || "Loading..."}
  {/* home을 통해 접속 했을때는 router.query.title 값이 있어 제대로 보이지만.
        그냥 url 입력하여 들어갔을 경우에는 보이지 않는 문제가 있다. */}
  </h4>
  </div>
)
}

export default Detail;
```

### Catch All Router URL [ …params ]

대괄호 안에 세 개의 점( )을 추가하여 동적 경로를 확장하여 모든 경로를 포착할 수 있게 된다.

`pages/post/[...slug].js`일치 `/post/a`하지만 또한 `/post/a/b`등 `/post/a/b/c`이 있다.

```typescript
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
```
