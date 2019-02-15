import Cookies from 'universal-cookie';

const userTokenId = "userToken";

export function getUserToken(){
    const cookies = new Cookies();
    return cookies.get(userTokenId);
}

export function saveUserToken(token){
    const cookies = new Cookies();
    cookies.set(userTokenId, token, { path: '/' });
}

export function deleteUserToken(){
    const cookies = new Cookies();
    cookies.set(userTokenId, "", { path: '/' });
}