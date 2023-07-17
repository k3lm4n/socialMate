import React, { PropsWithChildren } from "react";
import { RegisterSchema } from "../utils/validator/auth";




type IContext = RegisterSchema

export const RegisterContext = React.createContext({} as IContext);

const RegisterProvider = (props: PropsWithChildren) => {






  return (
    <RegisterContext.Provider value={{  }}>
      {props.children}
    </RegisterContext.Provider>
  );
};

export default RegisterProvider;
