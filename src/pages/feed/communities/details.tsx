import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import { ChatEndPoints } from "../../../api/api";
import Loading from "../../../components/Loading/index";
import { UsersIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ModalAddMembersContext } from "../../../context/ModalAddMembersContext";

export default function ChannelDetails() {
  const { channelId } = useParams<{ channelId: string }>();
  const { status, data } = useQuery(["channelUnique", channelId], () =>
    ChatEndPoints.getChannel(channelId)
  );
  const ctx = useContext(ModalAddMembersContext);
  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <div className="p-4">
          <div className="mt-2 flex items-center gap-x-6">
            <img
              src={"https://ui-avatars.com/api/" + data?.data.name}
              alt=""
              className="w-16 h-16 rounded-full"
            />
            <div className="px-4 sm:px-0 ">
              <h3 className="text-2xl font-semibold leading-7 text-gray-900">
                {data?.data.name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Detalhes do canal
              </p>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Criado por:
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {data?.data.creator.name}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Descrição
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {data?.data.description}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Membros
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
                    <li
                      className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6 cursor-pointer"
                      onClick={() => ctx.handle()}
                    >
                      <div className="flex w-0 flex-1 items-center">
                        <UsersIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">
                            Adicionar Membros
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          <PlusCircleIcon className="w-5 h-5 fill-green-500" />
                        </a>
                      </div>
                    </li>
                    {data?.data.members.map(
                      (member: {
                        id: string;
                        name: string;
                        avatar: string;
                      }) => (
                        <li
                          className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                          key={member.id}
                        >
                          <div className="flex w-0 flex-1 items-center">
                            <img
                              src={"https://ui-avatars.com/api/" + member.name}
                              alt=""
                              className="rounded-full w-8 h-8"
                            />
                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                              <span className="truncate font-medium">
                                {member.name}
                              </span>
                              <span className="flex-shrink-0 text-gray-400"></span>
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <a
                              href="#"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              <MinusCircleIcon className="w-5 h-5" />
                            </a>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </>
  );
}
