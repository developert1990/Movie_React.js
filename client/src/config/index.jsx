import firebase from 'firebase';
import axios from 'axios';

// 로컬 용도
// export const API_BASE = 'http://localhost:7000';
// export const USER_BASE = 'http://localhost:7000/user';
//netlify 사용시 서버
export const API_BASE = 'https://hong-movie.herokuapp.com';
export const USER_BASE = 'https://hong-movie.herokuapp.com/user';

export const EMAIL_REG_EXP = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

// firebase login을 구현하기 위한 config 와 initialize 실행메소드
export const firebaseConfig = {
    apiKey: "AIzaSyAOsMXIwn4Ha3GnZh9LCzZLyQvIj8qfToA",
    authDomain: "hongmovie-auth.firebaseapp.com",
    databaseURL: "https://hongmovie-auth.firebaseio.com",
    projectId: "hongmovie-auth",
    storageBucket: "hongmovie-auth.appspot.com",
    messagingSenderId: "902054885427",
    appId: "1:902054885427:web:e8af87c94e5ac598f98b46",
    measurementId: "G-KRLT360LGB"
};


// movie api 
export const axiosMovieAPI = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});


const TMDB_APIKEY = 'ffc29b6404c450fb65bb32ef6996276d';

export const requests = {
    fetchTrending: `/trending/all/week?api_key=${TMDB_APIKEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${TMDB_APIKEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${TMDB_APIKEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${TMDB_APIKEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${TMDB_APIKEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${TMDB_APIKEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${TMDB_APIKEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${TMDB_APIKEY}&with_genres=99`,
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);