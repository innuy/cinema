//const BASE_URL = "http://localhost:8000";

const BASE_URL = "https://cinema-innuy-backend.now.sh"; //SERVER

//const BASE_URL = "http://192.168.0.109:8000"; //JP PC

export const urls = {
    login: BASE_URL + "/session",
    films: BASE_URL + "/movies",
    addFilmImage: BASE_URL + '/movie/image-upload/',
    auditoriums: BASE_URL + '/auditoriums',
    presentations: BASE_URL + '/presentations',
    tickets: BASE_URL + '/tickets',
    users: BASE_URL + '/users',
    currentUser: BASE_URL + '/users/current',
    topMovies: BASE_URL + '/dashboard/top-movies',
    ticketsSold: BASE_URL + '/dashboard/sold-ratio'
};
