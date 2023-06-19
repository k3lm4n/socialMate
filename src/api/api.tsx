// "use client";

import { ChatChannelType, ChatType } from "../utils/validator/chatChannel";
import axiosInstance from "./axiosInstance";

//User API

async function logout() {
  const response = await axiosInstance.post("/auth/logout");
  return response;
}

async function getUsers() {
  const response = await axiosInstance.get("/user");
  return response;
}



async function createUser(data: {}) {
  const response = await axiosInstance.post("/user", data);
  return response;
}

async function updateUser(id: string, data: {}) {
  const response = await axiosInstance.put("/user/" + id, data);
  return response;
}

async function deleteUser(id: string) {
  const response = await axiosInstance.delete("/user/" + id);
  return response;
}

export const UserEndPoints = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  logout,
};

//Chat API

async function getChats() {
  const response = await axiosInstance.get("/chat/byUser");
  return response;
}

async function getChatsOnChannel(id:string) {
  const response = await axiosInstance.get("/chat/byChannel/"+id);
  return response;
}


async function createChat(data:ChatType) {
  const response = await axiosInstance.post("/chat", data);
  return response;
}


async function createChannel(data:ChatChannelType){
  const response = await axiosInstance.post("/chatChannel",{data});
  return response;
}

async function getChannelbyId(id?: string) {
  const response = await axiosInstance.get("/chat/chatsOnChannel/" + id);
  return response;
}


async function getChannels() {
  const response = await axiosInstance.get("/chatChannel/byUser/");
  return response;
}

async function getChannel(id?:string) {
  const response = await axiosInstance.get("/chatChannel/"+id);
  return response;
}

async function searchChat(name: string) {
  const response = await axiosInstance.get("/chat/search/", {
    params: { name },
  });
  return response;
}

async function getChat(id?: string) {
  const response = await axiosInstance.get("/chat/" + id);
  return response;
}

async function deleteChat(id: string) {
  const response = await axiosInstance.delete("/chat/" + id);
  return response;
}

async function getCreateOptionsChannel() {
  const response = await axiosInstance.get("/chatChannel/options");
  return response;
}

export const ChatEndPoints = {
  getChats,
  createChat,
  searchChat,
  getChat,
  deleteChat,
  getCreateOptionsChannel,
  createChannel,
  getChannelbyId,
  getChannels,
  getChatsOnChannel,
  getChannel
};

async function getCategories() {
  const response = await axiosInstance.get("/category");
  return response;
}

export const CategoriesEndPoints = {
  getCategories,
};
