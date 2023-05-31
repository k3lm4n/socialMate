import io from "socket.io-client";

const socketServerAddress = "http://localhost:3443";

export const socket = io(socketServerAddress);
