import { useContext, useEffect, useRef } from "react";
import BubbleChatLeft from "../../components/Chat/BubbleChatLeft";
import BubbleChatRight from "../../components/Chat/BubbleChatRight";
import {
  // VideoCameraIcon,
  // PhoneIcon,
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
  const { user } = useContext(AuthContext);
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
  const messageBox = useRef(null) as any;

  useEffect(() => {
    queryClient.invalidateQueries("chatUnique");

    messageBox.current?.scrollTo({
      behavior: "smooth",
      top: messageBox.current?.scrollHeight,
    });
  }, [chatId, messages.length]);

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
    MessageEndPoints.sendMessage({ ...message, chatId: chatId })
  );

  const onSubmit: SubmitHandler<Message> = async (data) => {
    if (data.content !== "") {
      messageBox.current?.scrollTo({
        behavior: "smooth",
        top: messageBox.current?.scrollHeight,
      });
      await mutateAsync(data).catch((res: any) => {
        if (res.response.status === 500) {
          toast.error("Impossivel enviar a mensagem");
        }
      });
    }
    setValue("content", "");
  };

  register("senderId", { value: user?.id });
  register("chatId", { value: chatId });

  return (
    <>
      {user && status === "loading" ? (
        <Loading />
      ) : (
        <div className="bg-gray-50 flex flex-col w-full h-full">
          <div className=" h-14 bg-gray-100 rounded-l-3xl rounded-r-md  flex items-center mb-2 justify-between mx-2 mt-4 ">
            <div className="flex items-center gap-2 ">
              {data.name === "Private Chat" ? (
                <>
                  <div className="w-11 rounded-full ">
                    <img
                      alt="Chat"
                      width={56}
                      height={56}
                      src={"https://ui-avatars.com/api/" + data.members[0].name}
                      className="rounded-full"
                    />
                  </div>
                  <button>
                    <h1 className="text-xl">{data.members[0].name}</h1>
                  </button>
                </>
              ) : (
                <>
                  <div className="w-11 rounded-full ">
                    <img
                      alt="Chat"
                      width={56}
                      height={56}
                      src={"https://ui-avatars.com/api/" + data.name}
                      className="rounded-full"
                    />
                  </div>
                  <button>
                    <h1 className="text-xl">{data.name}</h1>
                  </button>
                </>
              )}
            </div>
            <div className="flex mr-4 w-20 justify-between">
              {/* <button>
                <VideoCameraIcon
                  className="h-6 w-6 ml-2"
                  width={24}
                  height={24}
                />
              </button>
              <button>
                <PhoneIcon className="h-5 w-5 ml-2" width={20} height={20} />
              </button> */}
            </div>
          </div>
          <div className="h-full overflow-y-auto pb-3 px-2" ref={messageBox}>
            {statusMessage === "success" ? (
              Object.values(messages).length > 0 &&
              messages.map((msg, index) =>
                (msg.isOfSender && (!user?.id || user.id === msg.senderId)) ||
                (msg.isOfSender && user?.id === msg.senderId) ? (
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
          <div className="w-full flex flex-row  items-end px-4 pb-2 ">
            <form
              className="flex flex-row w-full pt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                {...register("content")}
                className="input input-bordered lg:input-lg  lg:w-full w-full "
              />
              <button type="submit" className="btn btn-xl ml-2">
                <PaperAirplaneIcon className="h-12 w-7" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

// // components/MessageList.tsx
// const MessageList = ({ messages }: Props) => {
//   const ref = useRef<HTMLDivElement>(null);
//   useEffect(() => {

//   }, [messages.length]);
//   return (
//     //...
//   );
// };

// export default MessageList;

export default Chat;
