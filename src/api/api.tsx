// "use client";

import axiosInstance from "./axiosInstance";

//User API

async function getUsers() {
  const response = await axiosInstance.get("/user");
  return response.data;
}

async function createUser(data: {}) {
  const response = await axiosInstance.post("/user", data);
  return response.data;
}

async function updateUser(id: string, data: {}) {
  const response = await axiosInstance.put("/user/" + id, data);
  return response.data;
}

async function deleteUser(id: string) {
  const response = await axiosInstance.delete("/user/" + id);
  return response.data;
}

export const UserEndPoints = { getUsers, createUser, updateUser, deleteUser };

//Chat API

async function getChats() {
  const response = await axiosInstance.get("/chat");
  return response.data;
}

async function createChat({
  userIds,
  name,
}: {
  userIds: string[];
  name: string;
}) {
  const response = await axiosInstance.post("/chat", { userIds, name });
  return response.data;
}

async function searchChat(name: string) {
  const response = await axiosInstance.get("/chat/search/", {
    params: { name },
  });
  return response.data;
}

async function getChat(id: string) {
  const response = await axiosInstance.get("/chat/" + id);
  return response.data;
}

async function deleteChat(id: string) {
  const response = await axiosInstance.delete("/chat/" + id);
  return response.data;
}



export const ChatEndPoints = {
  getChats,
  createChat,
  searchChat,
  getChat,
  deleteChat,
};
