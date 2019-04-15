import {unauthorizedAccess} from "../App";

const UNAUTHORIZED_CODE = 401;

export function hasAuthorizationError(error) {
    if (error.response.status === UNAUTHORIZED_CODE) {
        unauthorizedAccess();
        return true;
    } else {
        return false
    }
}