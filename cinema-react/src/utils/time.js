export function parseTime(time){
    const date = new Date(time);

    let month = date.getMonth() + 1;
    let hours = date.getHours();
    if(hours < 10){
        hours = "0" + hours;
    }
    let minutes = date.getMinutes();
    if(minutes < 10){
        minutes = "0" + minutes
    }
    return date.getDate() + "/" + month + "/" + date.getFullYear() + " " + hours + ":" + minutes;
}