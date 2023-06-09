import { useContext, useEffect } from "react";
import BubbleChatLeft from "../../components/Chat/BubbleChatLeft";
import BubbleChatRight from "../../components/Chat/BubbleChatRight";
import {
  VideoCameraIcon,
  PhoneIcon,
  PaperAirplaneIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

import { Message } from "../../utils/types/@types";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ChatEndPoints, MessageEndPoints } from "../../api/api";
import Loading from "../Loading";
import toast from "react-hot-toast";

const Chat = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { status, data } = useQuery(["chatUnique", chatId], () =>
    ChatEndPoints.getChat(chatId)
  );
  const { messages, setRoom, populateMessages } = useContext(SocketContext);

  const { status: statusMessage } = useQuery(
    ["chatMessagessss", chatId],
    () =>
      MessageEndPoints.getMessages(chatId).then((res) => {
        populateMessages(res.data);
        return res;
      }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries("chatUnique");
  }, [chatId]);

  const { user } = useContext(AuthContext);

  // var y = window.scrollY;

  // useEffect(() => {
  //   var element = document.querySelector(".ref");
  //   window.scroll({
  //     top: element?.scrollHeight,
  //     left: 0,
  //   });
  // }, [messages]);

  const { register, handleSubmit, setValue } = useForm<Message>({
    defaultValues: {
      content: "",
    },
  });

  setRoom({
    chatId: chatId,
    senderId: user?.id as string,
    socketId: undefined,
  });

  const { mutateAsync } = useMutation((message: Message) =>
    MessageEndPoints.sendMessage(message)
  );

  const onSubmit: SubmitHandler<Message> = async (data) => {
    console.log(data);
    await mutateAsync(data).catch((res: any) => {
      if (res.response.status === 500) {
        toast.error("Impossivel enviar a mensagem");
      }
    });
    setValue("content", "");
  };


  register("senderId", { value: user?.id });
  register("chatId", { value: chatId });

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <div className="bg-gray-50 flex flex-col w-full h-full">
          <div className="w-full h-14 bg-gray-100 rounded-l-3xl rounded-r-md  flex items-center mb-2 justify-between ">
            <div className="flex items-center ">
              <div className="w-11 rounded-full mr-2">
                <img
                  alt="Chat"
                  width={56}
                  height={56}
                  src={"https://ui-avatars.com/api/" + data?.data.name}
                  className="rounded-full"
                />
              </div>
              <button>
                <h1 className="text-xl">{data?.data.name}</h1>
              </button>
            </div>
            <div className="flex mr-4 w-20 justify-between">
              <button>
                <VideoCameraIcon
                  className="h-6 w-6 ml-2"
                  width={24}
                  height={24}
                />
              </button>
              <button>
                <PhoneIcon className="h-5 w-5 ml-2" width={20} height={20} />
              </button>
            </div>
          </div>
          <div className="ref h-full overflow-y-auto pb-3">
            {statusMessage === "success" ? (
              Object.values(messages).length > 0 &&
              messages.map((msg, index) =>
                msg.senderId === user?.id ? (
                  <BubbleChatRight props={msg} key={index} />
                ) : (
                  <BubbleChatLeft props={msg} key={index} />
                )
              )
            ) : statusMessage === "loading" ? (
              <Loading />
            ) : (
              <span>
                <ExclamationTriangleIcon
                  className="h-7 w-7"
                  width={48}
                  height={48}
                />{" "}
                Erro ao carregar as mensagens
              </span>
            )}
          </div>
          <div className="w-full flex flex-row  items-end ">
            <form
              className="flex flex-row w-full pt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                {...register("content")}
                className="input input-bordered lg:input-lg  lg:w-full w-full "
              />
              <button type="submit" className="btn btn-md ml-2  ">
                <PaperAirplaneIcon className="h-7 w-7" width={48} height={48} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
