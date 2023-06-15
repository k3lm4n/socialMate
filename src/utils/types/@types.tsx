export type Signup = {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  username: string;
  lastname: string;
  course: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  degree?: string;
  birthdate?: string;
  interest?: {
    label: string;
    value: string;
  }[];
};

export type Login = {
  email: string;
  password: string;
};

export interface Message {
  id?: string;
  content: string;
  senderId: string;
  receiverId?: string;
  createdAt?: Date;
  socketId?: string;
}

export interface User {
  id: string;
  username: string;
  createdAt: Date;
}

export interface Group {
  id: string;
  name: string;
  createdAt: Date;
  users: User[];
  messages: Message[];
}

export type MappedCourses = {
  label: string;
  value: string;
  options: {
    label: string;
    value: string;
  };
};
