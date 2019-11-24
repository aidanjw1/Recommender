import React, { useState, useEffect } from 'react';
import { Container, Grid, List, ListItem } from '@material-ui/core';
import AutoComplete from '../Components/AutoComplete';
import MovieBox from '../Components/MovieBox';

const STORAGE_KEY = '_pickflix_storage';

const Home = () => {
    const [ movieList, setMovieList ] = useState([]);
    const [ myList, setMyList ] = useState(localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)) : []);
    const [ recs, setRecs ] = useState([]);
  
    useEffect(() => {
        async function getMovies() {
            const res = await fetch('/movies');
            const json = await res.json();
            setMovieList(json)  
        }
        getMovies();
    }, []);

    useEffect(() => {
        const fetchRecommendations = async () => {
            if(myList.length === 0) return;

            const res = await fetch('/recommendations', {
                method: 'POST',
                body: JSON.stringify({
                    ids: myList.map(item => item.id)
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const body = await res.json();
            setRecs(body['recommendations']);
        }
        fetchRecommendations();
    }, [ myList ]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(myList));
    }, [myList])

    const handleSelect = (item) => {
        setMyList([ item, ...myList ]);
    }

    const removeFromList = (item, list) => {
        return list.filter(_item => _item != item);
    }

    if(movieList.length == 0) {
        return <span>Loading...</span>;
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Container style={{padding: '2rem'}}>
                    <AutoComplete data={movieList} onSelect={handleSelect} />
                </Container>
            </Grid>
            <Grid item xs={12} md={6}>
                <Container>
                    <h1>My List</h1>
                    <List>
                        {myList.map((item, i) => (
                            <ListItem key={i}>
                                <MovieBox movie={item} remove={() => setMyList(removeFromList(item, myList))} />
                            </ListItem>
                        ))}
                    </List>
                </Container>
            </Grid>
            <Grid item xs={12} md={6}>
                <Container>
                    <h1>Recommendations</h1>
                    <List>
                        {recs.slice(0, 10).map((item, i) => (
                            <ListItem key={i}>
                                <MovieBox movie={item} />
                            </ListItem>
                        ))}
                    </List>
                </Container>
            </Grid>
        </Grid>
    )
}

export default Home;