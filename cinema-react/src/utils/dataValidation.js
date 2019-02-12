export function emailIsValid(email){
    const regex = new RegExp('.+@.+\\..+');

    return regex.test(email);
}