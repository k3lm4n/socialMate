import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { UserEndPoints } from "../../../api/api";
import { Signup } from "../../../utils/types/@types";
import Loading from "../../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import StepOne from "../../../components/Form/Signup/StepOne";
import { useState } from "react";
import StepTwo from "../../../components/Form/Signup/StepTwo";
import StepThree from "../../../components/Form/Signup/StepThree";
import toast from "react-hot-toast";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { registerSchema } from "../../../utils/validator/auth";

const Steps = [<StepOne />, <StepTwo />, <StepThree />];

const notify = () =>
  toast("Boa! Bem-vindo a nossa comunidade!", {
    icon: "👏",
    duration: 3000,
  });

const SignUp = () => {
  const navigate = useNavigate();
  const { mutateAsync, isError, status, isLoading } = useMutation(
    (data: Signup) => UserEndPoints.createUser(data)
  );
  const methods = useForm<Signup>({
    resolver: zodResolver(registerSchema),
  });
  const [step, setStep] = useState(0);

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<Signup> = (data) => {
    mutateAsync(data);
    if (status === "success") {
      notify();
      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
    }
  };

  return (
    <>
      {isLoading && <Loading />}

      <div className="bg-gray-300">
        <div className="w-full h-screen">
          <div className="w-full h-screen  flex justify-center items-center">
            <div className="flex items-center justify-center  rounded-lg bg-white/30">
              <div className="flex flex-row shadow-xl rounded-xl">
                <div className="bg-auth w-96 h-[700px] rounded-l-xl"></div>
                <div className="lg:w-[700px] lg:h-[700px] px-6  flex flex-col  bg-white rounded-r-xl  ">
                  <div className="w-full flex flex-row-reverse items-center justify-between">
                    <div className="">
                      <h3 className="font-bold text-3xl text-gray-900 m-3  ">
                        Criar conta
                      </h3>
                    </div>
                    <ul className="steps">
                      <li className="step step-neutral"></li>
                      <li
                        className={step >= 1 ? "step step-neutral" : "step"}
                      ></li>
                      <li
                        className={step >= 2 ? "step step-neutral" : "step"}
                      ></li>
                    </ul>
                  </div>
                  <div className="w-full flex flex-col items-center justify-center">
                    <div className=" mt-2 flex flex-row w-full ">
                      <div className="w-full h-[1px] bg-gray-200 my-3 " />
                    </div>
                  </div>
                  <FormProvider {...methods}>
                    <form
                      onSubmit={handleSubmit(onSubmit, (error) =>
                        console.error(error)
                      )}
                      className="w-full h-full flex justify-center items-center flex-col"
                    >
                      {Steps[step]}

                      <div className="flex flex-row mt-10 w-full justify-between items-center ">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setStep((step) => step - 1);
                          }}
                          className={
                            step !== 0
                              ? "btn btn-outline"
                              : "btn btn-outline hidden "
                          }
                        >
                          <ArrowLeftIcon width={28} /> Voltar
                        </button>

                        {step === Steps.length - 1 ? (
                          <button type="submit" className="btn btn-outline">
                            Criar conta
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setStep((step) => step + 1);
                            }}
                            className="btn btn-outline justify-self-end"
                          >
                            Continuar <ArrowRightIcon width={32} />
                          </button>
                        )}
                      </div>
                    </form>
                  </FormProvider>
                  <div className="flex flex-col justify-center items-center">
                    <button className="border-[0.7px] w-48 py-2 rounded-md my-3 border-gray-200 bg-white  hover:bg-[#EA4335] hover:text-white hover:transition-all duration-300 ease-in-out">
                      Continuar com o Google
                    </button>
                    <p className=" text-sm mb-6 text-center font-regular">
                      Já tem uma conta?{" "}
                      <b className="text-blue-400">
                        <Link to={"/auth/login"}>Entrar</Link>
                      </b>
                    </p>
                  </div>
                  {isError && <p>Erro na Criaçāo de conta</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
