import { useContext, useEffect } from "react";
import BubbleChatLeft from "../../components/Chat/BubbleChatLeft";
import BubbleChatRight from "../../components/Chat/BubbleChatRight";
import {
  VideoCameraIcon,
  PhoneIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

import { Message } from "../../utils/types/@types";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { ChatEndPoints } from "../../api/api";
import Loading from "../Loading";

const Chat = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { status, data } = useQuery(["chatUnique", chatId], () =>
    ChatEndPoints.getChat(chatId)
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries("chatUnique");
  }, [chatId]);

  const { user } = useContext(AuthContext);
  const { sendMessage, messages, setRoom } = useContext(SocketContext);

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

  const onSubmit: SubmitHandler<Message> = async (data) => {
    sendMessage({
      content: data.content,
      senderId: user?.id as string,
      chatId: chatId,
    });
    setValue("content", "");
  };

  console.log("====================================");
  console.log(messages);
  console.log(user);
  console.log("====================================");

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
            {Object.values(messages).length > 0 &&
              messages.map((msg, index) =>
                msg.senderId == user?.id ? (
                  <BubbleChatRight props={msg} key={index} />
                ) : (
                  <BubbleChatLeft props={msg} key={index} />
                )
              )}
          </div>
          <div className="w-full flex flex-row justify-end ">
            <form
              className="flex flex-row w-full"
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
