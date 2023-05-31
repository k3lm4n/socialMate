// "use client";
import React, { PropsWithChildren, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { setCookie, parseCookies } from "nookies";




type User = {
  name: string;
  email: string;
  avatar?: string;
  id: string;
};

type IContext = {
  isAuth: boolean;
  user: User | undefined;
  signIn: (data: { email: string; password: string }) => Promise<void>;
};

export const AuthContext = React.createContext({} as IContext);

const AuthProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useState<User | undefined>();

  const isAuth = !!user;

  useEffect(() => {
    const { "socialMate.token": token } = parseCookies();
    if (token) {
      axiosInstance
        .get("/auth/me")
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  async function signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const response = await axiosInstance.post( "/auth", { email, password });

    setCookie(undefined, "socialMate.token", response.data.accessToken, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    setUser(response.data.userReponse);

    return response.data;
  }

  return (
    <AuthContext.Provider value={{ user, isAuth, signIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
