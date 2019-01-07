import Cookies from 'universal-cookie';

const userTokenId = "userToken";

export function getUserToken(){
    const cookies = new Cookies();
    console.log('getUserToken');
    return cookies.get(userTokenId);
}

export function saveUserToken(token){
    const cookies = new Cookies();
    console.log('saveUserToken: ' + token);
    cookies.set(userTokenId, token, { path: '/' });
}