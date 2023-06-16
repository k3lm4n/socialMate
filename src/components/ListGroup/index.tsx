import { useQuery } from "react-query";
import { ChatEndPoints } from "../../api/api";
import { Link } from "react-router-dom";
import { MiniLoading } from "../Loading";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

function useChannels() {
  return useQuery("actives", async () => {
    const { data } = await ChatEndPoints.getChannels();
    return data;
  });
}

const ListGroup = () => {
  const { status, data } = useChannels();

  return (
    <>
      {status === "loading" ? (
        <MiniLoading />
      ) : status === "error" ? (
        <span>
          <ExclamationTriangleIcon className="h-8 w-8 fill-red-500" />{" "}
        </span>
      ) : (
        data.channels.map((channel: { id: string; name: string }) => (
          <li className="flex items-center my-2  " key={channel.id}>
            <Link
              to={`/feed/${channel.id}`}
              className="lg:w-11 w-8 lg:h-11 h-8"
            >
              <img
                src={"https://ui-avatars.com/api/" + channel.name}
                width={44}
                height={44}
                alt={channel.name}
                className="top-0 lg:w-11 w-8 lg:h-11 h-8 animate-scaleOut hover:animate-scaleIn  hover:rounded-xl rounded-full "
              />
            </Link>
          </li>
        ))
      )}
    </>
  );
};

export default ListGroup;
