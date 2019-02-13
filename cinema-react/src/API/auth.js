import axios from 'axios';
import {urls} from '../utils/urls';
import {saveUserToken} from "../utils/cookieStorage";


export function login(email, password, callback){
    axios.post(urls.login, {
        user: {
            email,
            password,
        }
    })
        .then((response) => {
            callback(true);
            //saveUserToken()
        }).catch((error) => {
            callback(false, "There was an error with the connection");
    });
}

export function signUp(email, password, firstName, lastName, callback){
    axios.post(urls.signUp, {
        email,
        password,
        name: firstName,
        surname: lastName
    })
        .then((response) => {
            callback(true);
            //saveUserToken()
        }).catch((error) => {
            callback(false, "There was an error with the connection");
    });
}