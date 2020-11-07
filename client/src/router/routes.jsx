import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Signin } from '../pages/Signin';
import { Signup } from '../pages/Signup';
import { Browse } from '../pages/Browse';
import { axiosMovieAPI, requests } from '../config/index';

export default () => {
    const movieArr = [];
    const [movies, setMovies] = useState([]);
    const fetchUrl = [
        requests.fetchNetflixOriginals,
        requests.fetchTrending,
        requests.fetchTopRated,
        requests.fetchActionMovies,
        requests.fetchComedyMovies,
        requests.fetchHorrorMovies,
        requests.fetchRomanceMovies,
        requests.fetchDocumentaries
    ]

    useEffect(() => {
        (
            async () => {
                for (let i = 0; i < 8; i++) {
                    const request = await axiosMovieAPI.get(fetchUrl[i]);
                    movieArr.push(request.data.results);
                }
                const newData = movies.concat(movieArr);
                setMovies(newData);
            }
        )();
    }, []);


    return (
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route path='/signin' component={Signin} />
            <Route path='/browse' render={props => <Browse {...props} movies={movies} />} />
            <Route path="/signup" component={Signup} />
        </BrowserRouter>
    )
}

