import * as HoverCard from "@radix-ui/react-hover-card";
import { Link } from "react-router-dom";

const groups = [
  {
    name: "Member 1",
    username: "UserK3lm4n",
    id: "1",
    photo: "https://api.multiavatar.com/jay.svg",
  },
  {
    name: "Kelman Santos",
    username: "UserK3lm4n",
    id: "2",
    photo: "https://api.multiavatar.com/jack.svg",
  },
  {
    name: "Member 3",
    username: "UserK3lm4n",
    id: "3",
    photo: "https://api.multiavatar.com/miller.svg",
  },
  {
    name: "Member 4",
    username: "UserK3lm4n",
    id: "4",
    photo: "https://api.multiavatar.com/zoe.svg",
  },
  {
    name: "Member 1",
    username: "UserK3lm4n",
    id: "5",
    photo: "https://api.multiavatar.com/jay.svg",
  },
  {
    name: "UserK3lm4n",
    username: "UserK3lm4n",
    id: "6",
    photo: "https://api.multiavatar.com/jack.svg",
  },
  {
    name: "Member 3",
    username: "UserK3lm4n",
    id: "7",
    photo: "https://api.multiavatar.com/miller.svg",
  },
  {
    name: "Member 4",
    username: "UserK3lm4n",
    id: "8",
    photo: "https://api.multiavatar.com/zoe.svg",
  },
];

import { useQuery } from "react-query";
import { ChatEndPoints } from "../../api/api";


function useChats() {
  return useQuery("chats", async () => {
    const { data } = await ChatEndPoints.getChats()
    return data;
  });
}

const MemberCommunity = () => {

  const { status, data, error, isFetching } = useChats();

  console.log('====================================');
  console.log(status);
  console.log(isFetching);
  console.log(data);
  console.log(error);
  console.log('====================================');


  return (
    <>
      {groups.map((group) => (
        <HoverCard.Root key={group.id}>
          <HoverCard.Trigger asChild>
            <li className="flex  items-center content-center justify-center my-1 w-full h-11">
              <Link
                to={`/feed/communities/${group.id}`}
                className="flex w-[98%] flex-row h-11 rounded-md  justify-center items-center hover:bg-gray-300 hover:transition-all duration-300 "
              >
                <img
                  src={group.photo}
                  width={32}
                  height={32}
                  alt="Icon Group"
                  className="top-0 w-8 h-8 ml-2 mr-3 rounded-xl "
                />
                <div className="w-full">
                  <p className="text-base font-regular text-gray-800">
                    {group.name}
                  </p>
                  <p className="text-xs font-regular text-gray-400">
                    @{group.username}
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
                    src={group.photo}
                    width={60}
                    height={60}
                    alt="Icon Group"
                    className="top-0 w-[60px] h-[60px] ml-2 mr-3 rounded-full "
                  />
                  <div>
                    <div className="text-black m-0 text-sm font-bold leading-[1.5]">
                      {group.name}
                    </div>
                    <div className="text-blue-800 m-0 text-sm leading-[1.5]">
                      @{group.username}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[15px]">
                  <div className="text-black m-0 text-[15px] leading-[1.5]">
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                </div>
              </div>
              <HoverCard.Arrow className="fill-white" />
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
      ))}
    </>
  );
};

export default MemberCommunity;
