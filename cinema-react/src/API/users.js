import axios from "axios";
import {urls} from "../utils/urls";

export function getUsers(callback){
    /*TODO: CHANGE USERS URL*/
    axios.get(urls.users)
        .then((response) => {
            callback(true, parseUsers(response.data));
        }).catch((error) => {
        callback(false, "There was an error with the connection");
    });
}

export function getSingleUser(id, callback){
    /*TODO: CHANGE USERS URL*/
    let url = urls.users;
    if(id){
        url += "/" + id;
    }
    axios.get(url)
        .then((response) => {
            callback(true, parseSingleUser(response.data));
        }).catch((error) => {
            callback(false, "There was an error with the connection");
    });
}

export function addUser(user, callback){
    /*TODO: CHANGE USERS URL*/
    axios.post(urls.users, {
        //TODO: PUT DATA
    })
        .then((response) => {
            callback(true);
        }).catch((error) => {
        console.log(JSON.stringify(error));
        callback(false, "There was an error with the connection");
    });
}

export function editUser(user, callback){
    /*TODO: CHANGE USERS URL*/
    axios.put(urls.users + "/" + user.id, {

    })
        .then((response) => {
            callback(true);
        }).catch((error) => {
            callback(false, "There was an error with the connection");
    });
}

export function deleteUser(id, callback){
    /*TODO: CHANGE USERS URL*/
    axios.delete(urls.users + "/" + id)
        .then((response) => {
            callback(true);
        }).catch((error) => {
            callback(false, "There was an error with the connection");
    });
}

function parseUsers(users){
    const res = [];

    for(let i = 0; i < users.length; i++){
        res.push({
            //TODO: PARSE
        })
    }

    return res;
}

function parseSingleUser(user){
    const res = {

    };

    //TODO: PARSE

    return res;
}

