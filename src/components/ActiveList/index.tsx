import { useMutation, useQuery } from "react-query";

import { ChatEndPoints, UserEndPoints } from "../../api/api";
import { MiniLoading } from "../Loading";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { toast } from "react-hot-toast";
import { ChatType } from "../../utils/validator/chatChannel";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ActiveListContext } from "../../context/ActiveListContext";

export default function ActiveList() {
  const { status, data } = useQuery("ChatList", async () => {
    const { data } = await UserEndPoints.getUsers();
    return data;
  });
  const navigate = useNavigate();
  const ctx = useContext(ActiveListContext);

  const { mutateAsync, isLoading } = useMutation(
    (data: ChatType) => ChatEndPoints.createChat(data),
    {
      onSuccess: () => {
        toast.success("Chat criado com sucesso!", { duration: 3000 });
        setTimeout(() => {
          ctx.handle();
          navigate("/feed/chats");
        }, 1000);
      },
      onError: () => {
        toast.error("Erro ao criar chat!", { duration: 3000 });
      },
    }
  );
  return (
    <>
      <div className="space-y-12">
        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label
              htmlFor="searchbar"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Pesquisar activos
            </label>
            <div className="mt-4">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300   sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                <input
                  type="text"
                  name="searchbar"
                  id="searchbar"
                  autoComplete="searchbar"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder=""
                />
              </div>
            </div>
          </div>
        </div>
        <ul role="list" className="divide-y divide-gray-100">
          {status === "loading" || isLoading === true ? (
            <MiniLoading />
          ) : status === "error" ? (
            <span className="w-full h-full flex justify-center items-center">
              <ExclamationTriangleIcon className="h-8 w-8 fill-red-500" />{" "}
            </span>
          ) : (
            data.map(
              (person: {
                name: string;
                id: string;
                degree: string;
                username: string;
                course: string;
              }) => (
                <li
                  key={person.id}
                  className="flex justify-between gap-x-6 py-5 cursor-pointer transition-all duration-300"
                  onClick={() => mutateAsync({ members: [person.id] })}
                >
                  <div className="flex gap-x-4 ">
                    <img
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      src={"https://ui-avatars.com/api/" + person.name}
                      alt=""
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {person.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        @{person.username}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {person.course}
                    </p>
                    {person.degree ? (
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {person.degree}
                      </p>
                    ) : (
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs leading-5 text-gray-500">
                          A determinar
                        </p>
                      </div>
                    )}
                  </div>
                </li>
              )
            )
          )}
        </ul>
      </div>
    </>
  );
}
