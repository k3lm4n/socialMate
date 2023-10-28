// "use client";

import { Message } from "../utils/types/@types";
import {
  AddMembersType,
  ChatChannelType,
  ChatType,
} from "../utils/validator/chatChannel";
import axiosInstance from "./axiosInstance";
import { PostSchemaType, UpdatePostSchemaType } from "../utils/validator/post";
import { AttachmentSchemaType } from "../utils/validator/attachment";

type IFile = {
  url: any;
  originalName: string;
  mimetype: string;
};

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

async function getAccessToken(channelName: string, userId: string) {
  const response = await axiosInstance.get(
    "/accessToken/" + channelName + "/" + userId
  );
  return response;
}

export const UserEndPoints = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  logout,
  getAccessToken,
};

//Chat API

async function getChats() {
  const response = await axiosInstance.get("/chat/byUser");
  return response;
}

async function getChatsOnChannel(id: string) {
  const response = await axiosInstance.get("/chat/byChannel/" + id);
  return response;
}

async function createChat(data: ChatType) {
  return await axiosInstance.post("/chat", data);
}

async function createChannel(data: ChatChannelType) {
  return await axiosInstance.post("/chatChannel", { data });
}

async function joinChannel(data: AddMembersType) {
  const response = await axiosInstance.post("/chatChannel/join", data);
  return response;
}

async function getChannelbyId(id?: string) {
  const response = await axiosInstance.get("/chat/chatsOnChannel/" + id);
  return response;
}

async function search(query: string) {
  const response = await axiosInstance.get("/search/", {
    params: { query },
  });
  return response;
}

export const SearchEndPoints = {
  search,
};

async function getChannels() {
  const response = await axiosInstance.get("/chatChannel/byUser/");
  return response;
}

async function getAllChannel() {
  const response = await axiosInstance.get("/chatChannel/");
  return response;
}

async function getChannel(id?: string) {
  const response = await axiosInstance.get("/chatChannel/" + id);
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
  return response.data;
}

async function deleteChat(id: string) {
  const response = await axiosInstance.delete("/chat/" + id);
  return response;
}

async function getCreateOptionsChannel() {
  const response = await axiosInstance.get("/chatChannel/options");
  return response;
}

async function sendMessage(data: Message) {
  const response = await axiosInstance.post("/message/", data);
  return response;
}

async function getMessages(chatId?: string) {
  const response = await axiosInstance.get("/message/" + chatId);
  return response;
}

export const MessageEndPoints = {
  sendMessage,
  getMessages,
};

async function getPostByInterest() {
  const response = await axiosInstance.get("/post/postByInterest/");
  return response.data;
}

async function getPost(id: string) {
  const response = await axiosInstance.get("/post/" + id);
  return response;
}
async function getAllPost() {
  const response = await axiosInstance.get("/post/");
  return response;
}

async function createPost(data: PostSchemaType) {
  const response = await axiosInstance.post("/post/", data);
  return response;
}

async function createContent(data: AttachmentSchemaType) {
  const response = await axiosInstance.post("/attachment/", data);
  return response;
}

async function deleteContent(id: string) {
  const response = await axiosInstance.delete("/attachment/" + id);
  return response;
}
async function getContentById(id: string) {
  const response = await axiosInstance.get("/attachment/unique/" + id);
  return response;
}

async function getByDiscriminator(discriminator: string) {
  const response = await axiosInstance.get("/attachment/" + discriminator);
  return response;
}

async function getByDiscriminatorContents(
  discriminator: string,
  category: string
) {
  const response = await axiosInstance.get(
    "/attachment/" + discriminator + "/" + category
  );
  return response;
}

async function updatePost(id: string, data: UpdatePostSchemaType) {
  const response = await axiosInstance.put("/post/" + id, data);
  return response;
}

async function deletePost(id: string) {
  const response = await axiosInstance.delete("/post/" + id);
  return response;
}

async function getAllMy() {
  const response = await axiosInstance.get("/post/mines/");
  return response.data;
}

export const PostEndPoints = {
  getPostByInterest,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getAllPost,
  getAllMy,
};

export const ContentEndPoints = {
  createContent,
  deleteContent,
  getByDiscriminator,
  getByDiscriminatorContents,
  getContentById,
};

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
  getChannel,
  joinChannel,
  getAllChannel,
};

async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axiosInstance.post<IFile>("/file/", formData);
  return response.data;
}
export const UploadEndpoint = {
  uploadFile,
};

async function getFiles() {
  const response = await axiosInstance.get("/file/");
  return response;
}

export const FileEndPoints = {
  getFiles,
};

async function getCategories() {
  const response = await axiosInstance.get("/category");
  return response;
}

async function getCourses() {
  const response = await axiosInstance.get("/category/courses");
  return response;
}

async function getUserByYear() {
  const response = await axiosInstance.get("/dashboard/degrees");
  return response;
}

async function getContentCount() {
  const response = await axiosInstance.get("/dashboard/content");
  return response;
}

async function getPostCount() {
  const response = await axiosInstance.get("/dashboard/post");
  return response;
}

async function getChannelCount() {
  const response = await axiosInstance.get("/dashboard/channel");
  return response;
}

async function getCoursesCount() {
  const response = await axiosInstance.get("/dashboard/courses");
  return response;
}

async function getSubcourses() {
  const response = await axiosInstance.get("/dashboard/subcourses");
  return response;
}

async function createComment(data: any) {
  const response = await axiosInstance.post("/comment/", data);
  return response;
}

async function getComments(postId: string) {
  const response = await axiosInstance.get("/comment/" + postId);
  return response;
}

async function deleteComment(id: string) {
  const response = await axiosInstance.delete("/comment/" + id);
  return response;
}

async function updateComment(id: string, data: any) {
  const response = await axiosInstance.put("/comment/" + id, data);
  return response;
}

export const CommentEndPoints = {
  createComment,
  getComments,
  deleteComment,
  updateComment,
};

export const DashboardEndPoints = {
  getUserByYear,
  getContentCount,
  getPostCount,
  getChannelCount,
  getCoursesCount,
  getSubcourses,
};

async function getInterests() {
  const response = await axiosInstance.get("/category/interests");
  return response;
}

export const CategoriesEndPoints = {
  getCategories,
  getCourses,
  getInterests,
};
