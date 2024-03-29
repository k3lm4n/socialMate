import { useContext, useRef } from "react";
import { ActiveListContext } from "../../context/ActiveListContext";
import { useMutation, useQuery } from "react-query";
import toast from "react-hot-toast";
import {
  ChatChannelType,
  chatChannel,
} from "../../utils/validator/chatChannel";
import { ChatEndPoints } from "../../api/api";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import Loading from "../Loading";

const notify = () =>
  toast("Boa!!", {
    icon: "👏",
    duration: 3000,
  });

export default function ActiveListCommunity() {
  const ctx = useContext(ActiveListContext);

  const { mutateAsync, isLoading } = useMutation(
    (data: ChatChannelType) => ChatEndPoints.createChannel(data),
    {
      onSuccess: () => {
        ctx.handle();
        notify();
      },
    }
  );

  const { status, data } = useQuery("usersPerOptions", async () => {
    const { data } = await ChatEndPoints.getCreateOptionsChannel();
    return data;
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ChatChannelType>({
    resolver: zodResolver(chatChannel),
  });

  const onSubmit: SubmitHandler<ChatChannelType> = async (req) => {

    await mutateAsync(req);
  };

  const cancelButtonRef = useRef(null);
  return (
    <>
      {status === "loading" || isLoading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit, (error) => console.error(error))}
        >
          <div className="bg-white pt-5 ">
            <div className="sm:flex sm:items-start">
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Canal de Comunidade
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Essas informações serão exibidas publicamente, portanto,
                    tenha cuidado com o que você compartilha.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="channel_name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Nome
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300   sm:max-w-md">
                          <input
                            type="text"
                            id="channel_name"
                            {...register("name")}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Programação II"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Categoria
                      </label>
                      {status === "success" && (
                        <Controller
                          name="category"
                          control={control}
                          render={({ field: { onChange } }) => (
                            <Select
                              placeholder="Selecione uma categoria"
                              options={data.courses}
                              onChange={(e: any) => onChange(e?.value || "")}
                            />
                          )}
                        />
                      )}
                      {errors.category?.message && (
                        <p className="text-red-600 text-xs">
                          {errors.category?.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Descrição
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="about"
                          {...register("description")}
                          rows={3}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                        />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        Escreva algumas frases sobre a comunidade.
                      </p>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="subcategories"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Intereses
                      </label>
                      {status === "success" && (
                        <Controller
                          control={control}
                          name="subcategories"
                          render={({ field: { onChange } }) => (
                            <Select
                              isMulti
                              placeholder="Selecione um ou mais interesses"
                              options={data.mappedCategories}
                              onChange={(e) => {
                                onChange(e);
                                // setHandle(e);
                              }}
                            />
                          )}
                        />
                      )}
                      {errors.members?.message && (
                        <p className="text-red-600 text-xs">
                          {errors.members?.message}
                        </p>
                      )}
                      {/* <div>
                                  {selectedOptions.map((h, index) => {
                                    return <p key={index}>{h.label}</p>;
                                  })}
                                </div> */}
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="members"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Membros
                      </label>
                      {status === "success" && (
                        <Controller
                          control={control}
                          name="members"
                          render={({ field: { onChange } }) => (
                            <Select
                              isMulti
                              placeholder="Selecione um ou mais membros"
                              options={data.users}
                              onChange={(e) => {
                                onChange(e);
                                // setHandle(e);
                              }}
                            />
                          )}
                        />
                      )}
                      {errors.members?.message && (
                        <p className="text-red-600 text-xs">
                          {errors.members?.message}
                        </p>
                      )}
                    </div>
{/* 
                    <div className="col-span-full">
                      <label
                        htmlFor="photo"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Foto de Perfil
                      </label>
                      <div className="mt-2 flex items-center gap-x-3">
                        <UserCircleIcon
                          className="h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <button
                                    type="button"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                  >
                                    Mudar
                                  </button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
            >
              Criar
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => ctx.handle()}
              ref={cancelButtonRef}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </>
  );
}
