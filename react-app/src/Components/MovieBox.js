import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, Button } from "@material-ui/core";
import { TMDB_KEY } from "../config";
  

const MovieBox = ({ movie, remove }) => {
    console.log(movie);

    const [ movieDetails, setMovieDetails ] = useState({});

    useEffect(() => {
        async function fetchMovie() {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${TMDB_KEY}&language=en-US`);
            const body = await res.json();
            setMovieDetails(body);
        }
        fetchMovie();
    }, [movie]);

    return (
        
            <Card style={{display: 'flex', width: '100%'}}>
                <Link to={`/movie/${movie}`}>
                    <img src={`https://image.tmdb.org/t/p/original/${movieDetails['poster_path']}`} alt={movieDetails['poster_path']}
                        height={130} width={100} />
                </Link>
                <CardContent>
                    <Link style={{width: '100%'}} to={`/movie/${movie}`}>
                        {movieDetails.title} <br/>
                    </Link>
                    {remove? <Button onClick={remove} size={'small'} style={{backgroundColor: 'red', color: 'white', margin: '1rem'}}>Remove</Button> : null }                        
                </CardContent>         
            </Card>
    )
}

export default MovieBox;