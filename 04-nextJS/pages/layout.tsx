import NavBar from "../components/navBar";
import React from "react";

type AppLayoutProps = {
  children: React.ReactNode;
};

// layout
// 페이지간 재사용이 되는 공통 component 를 넣어줄때 사용 한다.
// page, component 들을 props 로 받아 화면에 출력해준다. ( react app.js )
// CustomApp 에서도 하는 작업들이 많기에, layoutComponent 를 만들어 주어 중간에서 관리를 한다.

export default function Layout({children} : AppLayoutProps) {
  return (
    <>
      <NavBar/>
      <div>{children}</div>
    </>
  )
}