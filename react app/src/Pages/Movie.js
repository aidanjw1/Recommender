import React, { useState, useEffect } from "react";
import { Container, Paper } from "@material-ui/core";
import { TMDB_KEY } from "../config";
import MovieBox from "../Components/MovieBox";

const Movie = ({ match }) => {

    const [ recs, setRecs ] = useState([]);
    const [ movie, setMovie ] = useState({});
    const [ poster, setPoster ] = useState('');
  
    const { id } = match.params;
  
    useEffect(() => {
        
        async function fetchMovie() {
            const res = await fetch(`/recommendations/${id}`)
            const json = await res.json();
            setMovie(json['movie'])
            setRecs(json['recommendations']);
        }
        fetchMovie();

        async function fetchPoster() {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_KEY}&language=en-US`);
            const json = await res.json();
            const poster = json['poster_path'];
            setPoster(poster);
            }
            fetchPoster();

    }, [])
  
    if (recs.length == 0) {
      return <span>Loading...</span>
    }
    return (
      <div style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${poster}?api_key=${TMDB_KEY}")`,
          height: '100vh',
          padding: 0
        }}>
        <Container maxWidth='md'>
          <Paper style={{padding: '1rem'}}>
            <h1>Top Recommendations For: {movie['title']}</h1>
            <div style={{overflow: 'scroll', height: '50vh'}}>
            {
              recs.map((rec, i) => (
                <MovieBox movie={rec} />
              ))
            }
            </div>
          </Paper>
        </Container>
      </div>
    );
}

export default Movie;