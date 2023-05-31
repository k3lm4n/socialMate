import io from "socket.io-client";

const socketServerAddress = "http://api.oowl.tech";

export const socket = io(socketServerAddress);
