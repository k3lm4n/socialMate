import { useContext } from "react";
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

const Chat = () => {
  const { communityId } = useParams<{ communityId: string }>();

  const { user } = useContext(AuthContext);
  const { sendMessage, messages, setRoom } = useContext(SocketContext);

  const { register, handleSubmit } = useForm<Message>({
    defaultValues: {
      content: "",
    },
  });

  setRoom({
    receiverId: communityId,
    senderId: user?.id as string,
    socketId: undefined,
  });

  const onSubmit: SubmitHandler<Message> = async (data) => {
    sendMessage({
      content: data.content,
      senderId: user?.id as string,
      receiverId: communityId,
    });
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-14 bg-gray-100 rounded-l-3xl rounded-r-md  flex items-center mb-2 justify-between ">
        <div className="flex items-center ">
          <div className="w-11 rounded-full mr-2">
            <img
              alt="Chat"
              width={40}
              height={40}
              src="https://api.multiavatar.com/sally.svg"
            />
          </div>
          <button>
            <h1 className="text-xl">Obi-Wan Kenobi</h1>
          </button>
        </div>
        <div className="flex mr-4 w-20 justify-between">
          <button>
            <VideoCameraIcon className="h-6 w-6 ml-2" width={24} height={24} />
          </button>
          <button>
            <PhoneIcon className="h-5 w-5 ml-2" width={20} height={20} />
          </button>
        </div>
      </div>
      <div className="h-full overflow-y-auto pb-3">
        {messages.map((msg, index) =>
          msg.senderId === user?.id ? (
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
  );
};

export default Chat;
