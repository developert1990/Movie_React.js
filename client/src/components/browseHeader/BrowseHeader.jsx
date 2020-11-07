import React, { useState, useEffect } from 'react';
import { BrowseNav } from '../browseNav/BrowseNav';
import { Profile } from '../profile/Profile';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-responsive-modal';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

export const BrowseHeader = ({ movie }) => {
    console.log('moviedddd', movie)
    const [openPlayPage, setOpenPlayPage] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState('');
    const { backdrop_path, name, original_name, overview } = movie;
    // const { backdrop_path, first_air_date, genre_ids, id, name, origin_country, original_language, original_name, overview, poster_path, popularity, vote_average, vote_count } = movie;

    const opts = {
        height: "590",
        width: "500",
        playerVars: {
            autoplay: 1,
        }
    }

    useEffect(() => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            console.log('movie name: ', movie.name)
            movieTrailer(movie?.name || "")
                .then(url => {
                    // 유튜브에서 트레일러 url이 https://www.youtube.com/watch?v=XtMThy8QKqU 이런식으로 되어있다. v 가 가지는 파라미터를 뽑아와야한다.
                    const urlParams = new URLSearchParams(new URL(url).search);
                    console.log('params:', urlParams.get('v'));
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch(error => console.log('error 발생했음 url 없음'))
        }
    }, [movie])

    const handleBtn = () => {
        setOpenPlayPage(true);


    }


    return (
        <div className="browse__header" style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
            backgroundPosition: "center top",
            backgroundSize: "cover",
        }}>
            <div className="browse__header__nav">
                <BrowseNav />
                <Profile />
            </div>
            <div className="browse__header__contents">
                <h1>{movie?.title || name || original_name}</h1>
                <p>{overview}</p>
                <div className="twobuttons">
                    <Button onClick={handleBtn} className="browse__header__button">Play</Button>
                    <Modal classNames="browse__modal" open={openPlayPage} onClose={() => setOpenPlayPage(false)} center>

                        {trailerUrl ?
                            <YouTube className="browse__modal__video" videoId={trailerUrl} opts={opts} /> :
                            <div className="browse__modal__failed">Sorry, there is no video... </div>}

                    </Modal>
                    <Button className="browse__header__button">My List</Button>
                </div>

            </div>
            <div className="browse__header__fadeBottom" />
        </div>
    )
}
