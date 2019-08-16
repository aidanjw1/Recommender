import React, { useState, useEffect } from 'react';
import { Container, Paper } from "@material-ui/core";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path='/' exact component={Home} />
      <Route path='/movie/:id' component={Movie} />
    </Router>
  )
}

export default App;

const Home = () => {
  const [ movieList, setMovieList ] = useState([]);

  useEffect(() => {

    async function getMovies() {
      const res = await fetch('/movies');
      const json = await res.json();
      setMovieList(json)  
    }
    getMovies();

  }, [])

  if(movieList.length == 0) {
    return <span>Loading...</span>;
  }
  return (
    <Container maxWidth='md'>
      <h1>Click On A Movie To Get Recommendations</h1>
      {movieList.map(movie => (
          <Link to={`/movie/${movie.id}`}>
            <Paper style={{padding: '1rem', margin: '1rem', textAlign: 'center'}}><h4>{movie.title}</h4></Paper>
          </Link>
      ))}
    </Container>
  )
}

const Movie = ({ match }) => {
  const[ recs, setRecs ] = useState([]);
  const { id } = match.params;

  useEffect(() => {
      
    async function fdsa() {
      const res = await fetch(`/recommendations/${id}`)
      const json = await res.json();
      setRecs(json);
    }
    fdsa();

  }, [])

  if (recs.length == 0) {
    return <span>Loading... Heyo</span>
  }
  return (
    <Container maxWidth='md'>
      <Paper style={{padding: '1rem'}}>
        <h1>Top Recommendations For: {recs[0]}</h1>
        {
          recs.slice(1).map(rec => (
            <p>{rec}</p>
          ))
        }
      </Paper>
    </Container>
  );
}


