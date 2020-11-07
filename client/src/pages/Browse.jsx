import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { BrowseHeader } from '../components/browseHeader/BrowseHeader';
import { Row } from '../components/row/Row';
import { Footer } from '../components/footer/Footer';
import { axiosMovieAPI, requests } from '../config/index';

export const Browse = ({ movies }) => {
    console.log('movies in browse', movies)
    const history = useHistory();
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axiosMovieAPI.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length)]);
            return request;
        }

        fetchData();
    }, []);

    // function truncate(str, n) {
    //     return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    // }

    const userInfo = localStorage.getItem('userInfo');
    console.log(userInfo);

    return (
        <>{
            userInfo !== null || userInfo !== {} ?
                <div style={{ color: 'white' }}>
                    <BrowseHeader movie={movie} />
                    <Row title="Normal" movieInfo={movies[0]} isLargeRow />
                    <Row title="Trending Now" movieInfo={movies[1]} isLargeRow />
                    <Row title="Top Rated" movieInfo={movies[2]} isLargeRow />
                    <Row title="Action Movies" movieInfo={movies[3]} isLargeRow />
                    <Row title="Comedy Movies" movieInfo={movies[4]} isLargeRow />
                    <Row title="Horror Movies" movieInfo={movies[5]} isLargeRow />
                    <Row title="Romance Movies" movieInfo={movies[6]} isLargeRow />
                    <Row title="Documentaries" movieInfo={movies[7]} isLargeRow />
                    <Footer />
                </div>
                :
                <>
                    {history.push('/signin')}
                </>
        }
        </>
    )
}
