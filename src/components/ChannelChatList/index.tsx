import * as HoverCard from "@radix-ui/react-hover-card";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ChatEndPoints } from "../../api/api";
import { MiniLoading } from "../Loading";

const ChannelChatList = () => {
  const { channelId } = useParams<{ channelId: string }>();

  const { status, data } = useQuery(["chat", channelId], async () => {
    return await ChatEndPoints.getChannelbyId(channelId);
  });

  return (
    <>
      {status === "loading" ? (
        <MiniLoading />
      ) : status === "error" ? (
        <span>Error </span>
      ) : (
        data?.data.map(
          (chat: { id: string; name: string; description: string }) => (
            <HoverCard.Root key={chat.id}>
              <HoverCard.Trigger asChild>
                <li className="flex  items-center content-center justify-center my-1 w-full h-11">
                  <Link
                    to={`/feed/${channelId}/${chat.id}`}
                    className="flex w-[98%] flex-row h-11 rounded-md  justify-center items-center hover:bg-gray-300 hover:transition-all duration-300 "
                  >
                    <img
                      src={"https://ui-avatars.com/api/" + chat.name}
                      width={32}
                      height={32}
                      alt="Icon chat"
                      className="top-0 w-8 h-8 ml-2 mr-3 rounded-xl "
                    />
                    <div className="w-full">
                      <p className="text-base font-regular text-gray-800">
                        {chat.name}
                      </p>
                      <p className="text-xs font-regular text-gray-400">
                        @{chat.name}
                      </p>
                    </div>
                  </Link>
                </li>
              </HoverCard.Trigger>
              <HoverCard.Portal>
                <HoverCard.Content
                  className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-64 rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
                  sideOffset={5}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row  items-center">
                      <img
                        src={"https://ui-avatars.com/api/" + chat.name}
                        width={80}
                        height={80}
                        alt="Icon chat"
                        className="top-0 w-[80px] h-[80px] ml-2 mr-3 rounded-full "
                      />
                      <div>
                        <div className="text-black m-0 text-sm font-bold leading-[1.5]">
                          {chat.name}
                        </div>
                        <div className="text-blue-800 m-0 text-sm leading-[1.5]">
                          @{chat.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[15px]">
                      <div className="text-black m-0 text-[15px] leading-[1.5]">
                        {chat.description}
                      </div>
                    </div>
                  </div>
                  <HoverCard.Arrow className="fill-white" />
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
          )
        )
      )}
    </>
  );
};

export default ChannelChatList;
