import io from "socket.io-client";

const socketServerAddress = "https://api.oowl.tech";

export const socket = io(socketServerAddress);
