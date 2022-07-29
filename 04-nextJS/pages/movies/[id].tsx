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
