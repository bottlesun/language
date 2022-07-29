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
