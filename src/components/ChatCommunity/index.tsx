import { Link } from "react-router-dom";

const groups = [
  {
    name: "Subject 1",
    username: "#UserK3lm4n",
    id: "1",
    photo: "https://api.multiavatar.com/jay.svg",
  },
  {
    name: "Subject 2",
    username: "#UserK3lm4n",
    id: "2",
    photo: "https://api.multiavatar.com/jack.svg",
  },
  {
    name: "Subject 3",
    username: "#UserK3lm4n",
    id: "3",
    photo: "https://api.multiavatar.com/miller.svg",
  },
  {
    name: "Subject 4",
    username: "#UserK3lm4n",
    id: "4",
    photo: "https://api.multiavatar.com/zoe.svg",
  },
  {
    name: "Subject 5",
    username: "#UserK3lm4n",
    id: "5",
    photo: "https://api.multiavatar.com/jay.svg",
  },
  {
    name: "Subject 6",
    username: "#UserK3lm4n",
    id: "6",
    photo: "https://api.multiavatar.com/jack.svg",
  },
  {
    name: "Subject 7",
    username: "#UserK3lm4n",
    id: "7",
    photo: "https://api.multiavatar.com/miller.svg",
  },
  {
    name: "Subject 8",
    username: "#UserK3lm4n",
    id: "8",
    photo: "https://api.multiavatar.com/zoe.svg",
  },
  {
    name: "Subject 9",
    username: "#UserK3lm4n",
    id: "9",
    photo: "https://api.multiavatar.com/jay.svg",
  },
  {
    name: "Subject 10",
    username: "#UserK3lm4n",
    id: "10",
    photo: "https://api.multiavatar.com/jack.svg",
  },
  {
    name: "Subject 11",
    username: "#UserK3lm4n",
    id: "11",
    photo: "https://api.multiavatar.com/miller.svg",
  },
  {
    name: "Subject 12",
    username: "#UserK3lm4n",
    id: "12",
    photo: "https://api.multiavatar.com/zoe.svg",
  },
  {
    name: "Subject 13",
    username: "#UserK3lm4n",
    id: "13",
    photo: "https://api.multiavatar.com/jay.svg",
  },
];

const ChatCommunity = () => {
  return (
    <div className="h-full overflow-y-auto ">
      {groups.map((group) => (
        <li
          className=" flex  items-center content-center justify-center w-full h-12"
          key={group.id}
        >
          <Link
            to={"/feed/communities"}
            className="flex w-[98%]  flex-row h-11 rounded-xs justify-center items-center  "
          >
            <div className="w-full rounded-md h-11 hover:bg-gray-200 hover:transition-all duration-400 ">
              <p className="text-base pl-2 font-regular text-gray-800">
                {group.name}
              </p>
              <p className="text-xs pl-2 font-regular text-gray-400">
                {group.username}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </div>
  );
};

export default ChatCommunity;
