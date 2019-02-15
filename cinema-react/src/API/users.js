import axios from "axios";
import {urls} from "../utils/urls";
import {getUserToken} from "../utils/cookieStorage";
import {hasAuthorizationError} from "../utils/errorHandler";

export const USER_ROLES = {
    USER: 1,
    ADMIN: 2,
};

export function getUsers(callback){
    axios.get(urls.users, {headers: {"Authorization": 'Token '+ getUserToken()}})
        .then((response) => {
            callback(true, parseUsers(response.data));
        }).catch((error) => {
            if(!hasAuthorizationError(error)){
                callback(false, "There was an error obtaining users data");
            }
    });
}

export function getSingleUser(id, callback){
    let url = urls.users;
    if(id){
        url += "/" + id;
    }
    axios.get(url, {headers: {"Authorization": 'Token '+ getUserToken()}})
        .then((response) => {
            callback(true, parseSingleUser(response.data[0]));
        }).catch((error) => {
            if(!hasAuthorizationError(error)) {
                callback(false, "There was an error obtaining user data");
            }
    });
}

export function getMyUserData(callback){

    axios.get(urls.currentUser, {headers: {"Authorization": 'Token '+ getUserToken()}})
        .then((response) => {
            callback(true, parseSingleUser(response.data.user));
        }).catch((error) => {
            if(!hasAuthorizationError(error)) {
                callback(false, "There was an error obtaining your user data");
            }
    });
}

export function addUser(email, password, firstName, lastName, role, callback){

    axios.post(urls.users, {
        email,
        name: firstName,
        surname: lastName,
        role,
        password
    }, {headers: {"Authorization": 'Token '+ getUserToken()}})
        .then((response) => {
            callback(true);
        }).catch((error) => {
            if(!hasAuthorizationError(error)) {
                callback(false, "There was an error adding the user");
            }
    });
}

export function editUser(id, email, firstName, lastName, role, callback){
    axios.put(urls.users + "/" + id, {
        email,
        name: firstName,
        surname: lastName,
        role,
    }, {headers: {"Authorization": 'Token '+ getUserToken()}})
        .then((response) => {
            callback(true);
        }).catch((error) => {
            if(!hasAuthorizationError(error)) {
                callback(false, "There was an error editing the user's data");
            }
    });
}

export function editMyUserData(email, firstName, lastName, callback){
    axios.put(urls.currentUser, {
        email,
        name: firstName,
        surname: lastName,
    }, {headers: {"Authorization": 'Token '+ getUserToken()}})
        .then((response) => {
            callback(true);
        }).catch((error) => {
            if(!hasAuthorizationError(error)) {
                callback(false, "There was an error editing your data");
            }
    });
}

export function deleteUser(id, callback){
    axios.delete(urls.users + "/" + id, {headers: {"Authorization": 'Token '+ getUserToken()}})
        .then((response) => {
            callback(true);
        }).catch((error) => {
            if(!hasAuthorizationError(error)) {
                callback(false, "There was an error with deleting the user");
            }
    });
}

export function changePassword(email, oldPassword, newPassword, callback){
    axios.patch(urls.changePassword, {
        user: {
            email,
            password: oldPassword,
        },
        newPassword
    },{headers: {"Authorization": 'Token '+ getUserToken()}})
        .then((response) => {
            callback(true);
        }).catch((error) => {
        if(!hasAuthorizationError(error)){
            callback(false, "There was an error modifying the password");
        }
    });
}

function parseUsers(users){
    const res = [];

    for(let i = 0; i < users.length; i++){
        res.push({
            id: users[i]._id,
            email: users[i].email,
            token: users[i].token,
            firstName: users[i].name,
            lastName: users[i].surname,
            role: (users[i].role === USER_ROLES.ADMIN ? USER_ROLES.ADMIN : USER_ROLES.USER),
        })
    }

    return res;
}

export function parseSingleUser(user){

    const res = {
        id: user._id,
        email: user.email,
        token: user.token,
        firstName: user.name,
        lastName: user.surname,
        role: (user.role === USER_ROLES.ADMIN ? USER_ROLES.ADMIN : USER_ROLES.USER),
    };

    return res;
}

