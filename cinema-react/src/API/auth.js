import axios from 'axios';
import {urls} from '../utils/urls';
import {deleteUserToken, saveUserToken} from "../utils/cookieStorage";
import {parseSingleUser, USER_ROLES} from "./users";


export function login(email, password, callback){
    deleteUserToken();
    axios.post(urls.login, {
        user: {
            email,
            password,
        }
    })
        .then((response) => {
            const userData = parseSingleUser(response.data.user);
            saveUserToken(userData.token);
            callback(true, userData);
        }).catch((error) => {
            callback(false, "There was an error logging in");
    });
}

export function signUp(email, password, firstName, lastName, callback){
    deleteUserToken();
    axios.post(urls.users, {
        email,
        password,
        name: firstName,
        surname: lastName,
        role: USER_ROLES.USER,
    })
        .then((response) => {
            callback(true);
            //saveUserToken() //TODO: ADD USER TOKEN ON SIGNUP
        }).catch((error) => {
            callback(false, "There was an error with the connection");
    });
}