// "use client";

import axiosInstance from "./axiosInstance";

//User API

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

export const UserEndPoints = { getUsers, createUser, updateUser, deleteUser };

//Chat API

async function getChats() {
  const response = await axiosInstance.get("/chat/byUser");
  return response;
}

async function createChat({
  userIds,
  name,
}: {
  userIds: string[];
  name: string;
}) {
  const response = await axiosInstance.post("/chat", { userIds, name });
  return response;
}

async function searchChat(name: string) {
  const response = await axiosInstance.get("/chat/search/", {
    params: { name },
  });
  return response;
}

async function getChat(id: string) {
  const response = await axiosInstance.get("/chat/" + id);
  return response;
}

async function deleteChat(id: string) {
  const response = await axiosInstance.delete("/chat/" + id);
  return response;
}



export const ChatEndPoints = {
  getChats,
  createChat,
  searchChat,
  getChat,
  deleteChat,
};


