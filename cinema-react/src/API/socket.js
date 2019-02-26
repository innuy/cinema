import openSocket from 'socket.io-client';
import {urls} from "../utils/urls";


const  socket = openSocket(urls.socket);

function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000); 
}

export { subscribeToTimer };