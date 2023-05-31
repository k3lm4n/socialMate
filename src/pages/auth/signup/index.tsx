import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";

import { UserEndPoints } from "../../../api/api";
import { Signup } from "../../../utils/types/@types";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { mutateAsync, isLoading, isError } = useMutation((data: Signup) =>
    UserEndPoints.createUser(data)
  );
  const { register, handleSubmit } = useForm<Signup>({});

  const onSubmit: SubmitHandler<Signup> = (data) => {
    console.log(data);
    mutateAsync(data);
  };

  return (
    <>
      {isLoading && <Loading />}

      <div className=" bg-auth">
        <div className="w-full h-screen">
          <div className="w-full h-screen  flex content-center  justify-center items-center">
            <div className="flex items-center justify-center lg:w-[460px] lg:h-[780px] backdrop-blur-xl rounded-lg bg-white/30">
              <div className="lg:w-[380px] lg:h-[700px] px-16 pb-10 lg:pb-0 flex items-center flex-col bg-white rounded-xl shadow-2xl z-30 ">
                <h3 className="font-bold text-3xl text-gray-900 m-3 mt-10 ">
                  Criar uma conta
                </h3>
                <button className="border-[0.7px] w-full py-2 rounded-md my-3 border-gray-200 bg-white  hover:bg-[#EA4335] hover:text-white hover:transition-all duration-300 ease-in-out">
                  Crie conta com o Google
                </button>
                <div className="w-full flex flex-row my-4 ">
                  <div className="flex w-full h-[1px] bg-gray-border-gray-200 bg-white my-4 " />
                  <p className="px-2">Ou</p>
                  <div className="flex w-full h-[1px] bg-gray-border-gray-200 bg-white my-4 " />
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full h-full text-gray-900 "
                >
                  <div className="flex flex-col">
                    <div className="flex flex-col my-4">
                      <label className="mb-2" htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        className="border-[0.7px] border-gray-200 bg-white p-1 rounded-md"
                        {...register("name")}
                      />
                    </div>
                    <div className="flex flex-col  mb-4">
                      <label className="mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="border-[0.7px] border-gray-200 bg-white p-1 rounded-md"
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
                        className="border-[0.7px] border-gray-200 bg-white p-1 rounded-md "
                        type="password"
                        {...register("password")}
                      />
                    </div>
                    <div className="flex flex-col  mb-4">
                      <label className="mb-2" htmlFor="password">
                        Confirme a sua Password
                      </label>
                      <input
                        className="border-[0.7px] border-gray-200 bg-white p-1 rounded-md"
                        type="password"
                        {...register("passwordConfirmation")}
                      />
                    </div>
                  </div>

                  <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full text-center py-2 my-3  rounded-md  bg-gray-500 hover:bg-gray-600 text-white hover:transition-all duration-300 ease-in-out"
                  >
                    Criar conta
                  </button>
                  <p className=" text-sm my-2 text-center font-regular">
                    Já tem uma conta?{" "}
                    <b className="text-blue-400">
                      <Link to={"/auth/login"}>Entrar</Link>
                    </b>
                  </p>
                </form>
                {isError && <p>Erro na Criaçāo de conta</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
