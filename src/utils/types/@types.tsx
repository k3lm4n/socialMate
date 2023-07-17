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
  sender: string;
  chatId?: string;
  createdAt?: Date;
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

export type IPropsPost = {
  id: string;
  title?: string;
  content?: string;
  published?: boolean;
  private?: boolean;
  attatchments?: {
    id: string;
    url: string;
    mimetype: string;
    originalName: string;
  }[];
  categories?: {
    id: string;
    name: string;
    sigle: string;
  }[];
  subCategory?: {
    id: string;
    name: string;
    sigle: string;
  }[];
  author?: string;
  createdAt?: string;
  updatedAt?: string;
};
// author
// :
// {id: '64871e2ef0898faca16c8d7b', name: 'Kelman', lastname: 'Dias dos Santos'}
// categories
// :
// []
// content
// :
// "Prog II"
// createdAt
// :
// "2023-07-11T14:53:08.434Z"
// id
// :
// "64ad6cd4c67554b76196be58"
// private
// :
// false
// published
// :
// false
// subCategory
// :
// [{…}]
// title
// :
// "Prog"
// updatedAt
// :
// "2023-07-11T14:53:08.434Z"
