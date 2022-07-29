import Seo from '../components/seo'
import {useEffect, useState} from "react";
import Movie from "../interfaces/movieAPI.interface";
import axios from "axios";

const API_KEY = 'ba69329df4f72591efa5876439f845ec';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
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

      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  )
}

//getServerSideProps
// 함수이름을 바꿀 수 없다. / 안에 어떤 코드를 쓰던 server 에서만 돌아간다. ( 백엔드 에서만 돌아감 )
export async function getServerSideProps() {

}