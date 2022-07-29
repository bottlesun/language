import Seo from '../components/seo'
import Movie from "../interfaces/movieAPI.interface";
import axios from "axios";


export default function Home({results}: any) {

  return (
    <div className="container">
      <Seo title="Home"/>
      {results.map((movie: Movie) => (
        <div className="movie" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title}/>
          <h4>{movie.original_title}</h4>
        </div>
      ))}

      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie{
        cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
        }

        .movie img:hover {
          transform: scale(1.05) translateY(-10px);
        }

        .movie h4 {
          font-size: 18px;
          text-align: center;
          cursor:default ;
        }
      `}</style>
    </div>
  )
}

//getServerSideProps // 서버사이드렌더링에서만 실행
//요청에 따라 페이지가 데이터를 계속 업데이트해야는 상황에 사용
// 함수이름을 바꿀 수 없다. / 안에 어떤 코드를 쓰던 server 에서만 돌아간다. ( 백엔드 에서만 돌아감 )
export const getServerSideProps = async () => {
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