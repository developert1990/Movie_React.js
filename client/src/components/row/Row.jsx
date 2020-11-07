import React, { useState, useEffect } from 'react';
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-responsive-modal';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';


SwiperCore.use([EffectCoverflow, Navigation, Pagination]);

export const Row = ({ title, movieInfo }) => {
    const [trailerUrl, setTrailerUrl] = useState('');
    const [openPlayPage, setOpenPlayPage] = useState(false);
    const [clickedData, setClickedData] = useState({
        title: '',
        overview: '',
    });
    const [show, setShow] = useState(false);
    const base_url = "https://image.tmdb.org/t/p/original";



    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    const handleClick = (data) => {
        console.log('이미지 클릭됨', data);
        setClickedData({
            title: data.original_title,
            overview: data.overview,
            originalName: data.original_name,
            url: data.backdrop_path,
            name: data.name,
        });
        if (show === false) {
            setShow(true);
        }
    }

    const opts = {
        height: "590",
        width: "500",
        playerVars: {
            autoplay: 1,
        }
    }

    const handleBtn = ((clickedData) => {
        // setOpenPlayPage(true)
        if (trailerUrl) {
            console.log('clickedData', clickedData)
            setTrailerUrl('');
        } else {
            console.log('movie name: ', clickedData.name)
            movieTrailer(clickedData?.name || "")

                .then(url => {
                    // 유튜브에서 트레일러 url이 https://www.youtube.com/watch?v=XtMThy8QKqU 이런식으로 되어있다. v 가 가지는 파라미터를 뽑아와야한다.
                    const urlParams = new URLSearchParams(new URL(url).search);
                    console.log('params:', urlParams.get('v'));
                    setTrailerUrl(urlParams.get('v'));
                })
                .then(setOpenPlayPage(true))

                .catch(error => console.log('error 발생했음 url 없음'))
        }
    })

    return (
        <div className="row">
            <h1>{title}</h1>
            <div className="row__posters">
                <Swiper

                    style={{ height: '350px', padding: '10px', width: '1480px' }}
                    grabCursor={true}
                    // effect="coverflow"
                    spaceBetween={50}
                    slidesPerView={5}
                    // coverflowEffect={{
                    //     rotate: 50,
                    //     stretch: 0,
                    //     depth: 100,
                    //     modifier: 1,
                    //     slideShadows: false
                    // }}
                    pagination={{ clickable: true }}
                >
                    {
                        movieInfo !== undefined &&
                        // https://www.youtube.com/watch?v=bDePUXPg_JU

                        movieInfo.map((data) => {
                            return (
                                <>
                                    <SwiperSlide key={data.id}>
                                        <div className="row__item" onClick={() => handleClick(data)}>
                                            <img
                                                key={data.id}
                                                className={`row__poster`}
                                                src={`${base_url}/${data.poster_path}`}
                                                alt={data.originalName}
                                            />
                                            <div className="row__item__dec">
                                                <p className="row__item__title">{data.original_name || data.original_title}</p>
                                                <p className="row__item__overview">{truncate(data.overview, 150)}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>

                                </>
                            )
                        })
                    }
                </Swiper>
                {
                    show ?
                        <div
                            className="row__item__clicked__show"
                            style={{
                                background: `url(https://image.tmdb.org/t/p/original/${clickedData.url})`,
                                backgroundRepeat: 'no-repeat',
                                height: "360px",
                                display: 'flex',
                                backgroundSize: "contain",
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                position: 'relative',
                                backgroundPositionX: 'right',


                            }}>

                            <button onClick={() => setShow(false)} className="row__close">
                                <img src="/images/icons/close.png" alt="close button" />
                            </button>
                            <div className="row__clicked_desc">
                                <p className="row__clicked__title">{clickedData.originalName || clickedData.originalName || clickedData.title}</p>
                                <p className="row__clicked__overview">{truncate(clickedData.overview, 400)}</p>

                                <Button onClick={() => handleBtn(clickedData)} className="row__clicked__button">Play</Button>
                                <Modal classNames="browse__modal" open={openPlayPage} onClose={() => setOpenPlayPage(false)} center>

                                    {trailerUrl ?
                                        <YouTube className="browse__modal__video" videoId={trailerUrl} opts={opts} /> :
                                        <div className="browse__modal__failed">Sorry, there is no video... </div>}

                                </Modal>
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        </div>
    )
}
