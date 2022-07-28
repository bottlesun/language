import Link from 'next/link'
import {useRouter} from "next/router";
import {Nav} from "./navBar.styles";
// react-router-dom Link 와 같은 방식. - a 태그를 겉으로 사용 하면 페이지 이동간의 reload 가 일어남 (X)
// Link 태그 에서는 css 및 className 등 설정 할 수가 없어 내부에 a 태그를 넣어 style 을 입힌다.

// useRouter() - nextJS 의 Hook 으로 location 정보를 가지고 온다.

export default function NavBar() {
  const router = useRouter();

  return (
    <nav>
      <Link href="/">
        <a className={`link , ${router.pathname === "/" ? "active" : ''}`}>Home</a>
      </Link>
      <Link href="/about">
        <a className={['link', router.pathname === "/about" ? "active" : ''].join(" ")}>About</a>
      </Link>
      <style jsx>{`

        a {
          text-decoration: none;
          font-weight: bold;
        }

        .active {
          color: tomato;
        }
      `}</style>
    </nav>
  )
}