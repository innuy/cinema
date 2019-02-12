import axios from 'axios';
import {urls} from '../utils/urls';
import {getUserToken} from "../utils/cookieStorage";

export function login(email, password, callback){
    axios.post(urls.login, {
        user: {
            email,
            password,
        }
    })
        .then((response) => {
            callback(true);
        }).catch((error) => {
            callback(false, "There was an error with the connection");
    });
}

export function signUp(username, password, firstName, lastName, callback){
    axios.post(urls.signUp)
        .then((response) => {
            callback(true);
        }).catch((error) => {
            callback(false, "There was an error with the connection");
    });
}