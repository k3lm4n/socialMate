// "use client";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {  useMutation } from "react-query";

import { useForm, SubmitHandler } from "react-hook-form";
import { Login } from "../../../utils/types/@types";
import Loading from "../../../components/Loading";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const notify = () =>
  toast("Boa! Você está logado!", {
    icon: "👏",
    duration: 3000,
  });

const Login = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const { mutateAsync, isLoading, isError} = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      context.signIn({ email, password }),
    {
      onSuccess: () => {
        notify();
        setTimeout(() => {
          navigate("/feed/discovery");
        }, 3000);
      },
    
    }
  );


  const { register, handleSubmit } = useForm<Login>({});

  const onSubmit: SubmitHandler<Login> = async (data) => {
    console.log(data);
    await mutateAsync(data).catch((res) => {
      if (res.response.status === 401) {
        toast.error("Email ou senha incorretos");
      }
      else if (res.response.status === 500) {
        toast.error("Erro interno do servidor");
      }
    });
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="bg-auth">
        <div className="w-full h-screen backdrop-blur-sm ">
          <div className="w-full h-screen  flex content-center  justify-center items-center">
            <div className="flex items-center justify-center lg:w-[460px]  lg:h-[650px]  backdrop-blur-lg rounded-xl bg-white/30">
              <div className="lg:w-[380px] lg:h-[550px] px-16 lg:pb-0 pb-10 flex items-center flex-col bg-white rounded-xl shadow-2xl z-30 backdrop-blur-lg">
                <h3 className="text-3xl font-bold text-gray-900 m-3 mt-10 ">
                  Iniciar a sessão
                </h3>
                <button className="border-[0.7px] w-full py-2 rounded-md my-3 border-gray-200 hover:bg-[#EA4335] hover:text-white hover:transition-all duration-300 ease-in-out">
                  Continuar com o Google
                </button>
                <div className="w-full flex flex-row my-4 ">
                  <div className="flex w-full h-[1px] bg-greyborder-gray-200 my-4 " />
                  <p className="px-2">Ou</p>
                  <div className="flex w-full h-[1px] bg-greyborder-gray-200 my-4 " />
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full h-full text-gray-900 "
                >
                  <div className="flex flex-col">
                    <div className="flex flex-col  mb-4">
                      <label className="mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="border-[0.7px] border-gray-200 p-1 rounded-md bg-white"
                        type="email"
                        {...register("email")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-col  mb-4">
                      <label className="mb-2" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="border-[0.7px] border-gray-200 p-1 rounded-md bg-white"
                        type="password"
                        {...register("password")}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-center py-2 my-3  rounded-md text-white bg-gray-500 text-sm font-regular hover:bg-gray-600  hover:transition-all duration-300 ease-in-out"
                  >
                    Iniciar Sessão
                  </button>
                  <p className=" text-sm my-2 text-center font-regular">
                    Não tem uma conta?{" "}
                    <b className="text-blue-400">
                      <Link to={"/auth/signup"}>Registra-se</Link>
                    </b>
                  </p>
                </form>
                {isError && <p></p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Login;
