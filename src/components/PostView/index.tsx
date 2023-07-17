import {
  HandThumbUpIcon,
  BookmarkIcon,
  ChatBubbleLeftIcon,
  ArrowPathRoundedSquareIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

import { IPropsPost } from "../../utils/types/@types";

function PostView({ id, title, content, author, attatchments }: IPropsPost) {
  return (
    <article className=" flex-col flex gap-5 bg-white rounded-md py-4" key={id}>
      <div className="flex justify-between px-4">
        <div className="flex gap-3 items-center">
          <img
            src={"https://ui-avatars.com/api/" + author}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-xs text-gray-500">
              {author ? author : "Author"}
            </p>
            <h2 className="text-lg">{title ? title : "Title of content"}</h2>
          </div>
        </div>
        <button>
          <EllipsisHorizontalIcon className="text-black w-6 h-6" />
        </button>
      </div>
      <div className="px-4">
        <p>
          {content && content.trim().length > 100
            ? content.trim().substring(0, 100) + "..." + " Ler mais"
            : content}
        </p>
      </div>

      {attatchments && attatchments.length > 0 && (
        <div className="flex-1 self-center aspect-[16/9] object-cover object-center rounded-sm carousel w-full">
          {attatchments.map((item) => {
            if (item.mimetype.includes("video")) {
              return (
                <video
                  key={item.id}
                  width="100%"
                  height="100%"
                  id={item.id}
                  className="carousel-item w-full"
                  controls
                >
                  <source src={item.url} type={item.mimetype} />
                </video>
              );
            } else if (item.mimetype.includes("image")) {
              return (
                <div key={item.id} className="carousel-item w-full">
                  <img src={item.url} className="w-full" />
                </div>
              );
            }
          })}
        </div>
      )}

      <div className="flex justify-center px-4 xl:gap-8 gap-x-4 w-full">
        <button className="flex xl:flex-row flex-col items-center text-center gap-2">
          <HandThumbUpIcon className="text-black lg:w-6 w-5 h-5 lg:h-6 " />
          <span className="xl:text-base text-xs">Gostei</span>
        </button>
        <button className="flex xl:flex-row flex-col items-center text-center gap-2">
          <ChatBubbleLeftIcon className="text-black lg:w-6 w-5 h-5 lg:h-6 " />
          <span className="xl:text-base text-xs">Comentar</span>
        </button>
        <button className="flex xl:flex-row flex-col items-center text-center gap-2">
          <ArrowPathRoundedSquareIcon className="text-black lg:w-6 w-5 h-5 lg:h-6 " />
          <span className="xl:text-base text-xs">Compartilhar</span>
        </button>
        <button className="flex xl:flex-row flex-col items-center text-center gap-2">
          <BookmarkIcon className="text-black lg:w-6 w-5 h-5 lg:h-6 " />
          <span className="xl:text-base text-xs">Guardar</span>
        </button>
      </div>
    </article>
  );
}

export default PostView;
