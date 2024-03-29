import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useContext } from "react";
import { ModalPostDetailsContext } from "../../context/ModalPostDetailsContext";

interface IPropsPostCardHome {
  id?: string;
  title?: string;
  content?: string;
  image?: string;
  interest: {
    id: string | undefined;
    name: string;
    sigle: string;
  }[];
}

function PostCard({ id, title, content, image, interest }: IPropsPostCardHome) {
  const ctx = useContext(ModalPostDetailsContext);

  return (
    <div
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow"
      key={id}
    >
      <Link to="#">
        <img
          className="rounded-t-lg h-48 w-full object-cover"
          src={
            image ||
            "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
          }
          alt=""
        />
      </Link>
      <div className="p-5">
        <Link to="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            {title && title.trim().length > 20
              ? title.trim().substring(0, 20) + "..."
              : title
              ? title
              : "Sem título"}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 ">
          {parse(content!) && String(parse(content!)).trim().length > 80
            ? String(parse(content!)).trim().substring(0, 80) + "..."
            : parse(content!)}
        </p>
        <button
          onClick={() => {
            ctx.handlePost(id!);
            ctx.handle();
          }}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
        >
          Saber Mais...
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              // stroke-linecap="round"
              // stroke-linejoin="round"
              // stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
      <div className="card-actions justify-end p-4">
        {interest &&
          interest.map((item) => {
            return (
              <div key={item.id} className="badge badge-outline">
                {item.name}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PostCard;
