import axios from "axios";
import {urls} from "../utils/urls";

export function getSingleUser(id, callback){
    /*TODO: CHANGE USERS URL*/
    axios.get(urls.users + "/" + id)
        .then((response) => {
            callback(true, parseUser(response.data));
        }).catch((error) => {
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

function parseUser(user){
    const res = {

    };

    //TODO: PARSE

    return res;
}