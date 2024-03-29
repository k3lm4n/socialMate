import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { IPropsContentView } from "../../utils/types/@types";
import { FileTextIcon } from "@radix-ui/react-icons";
import { ContentEndPoints } from "../../api/api";
import { useQuery } from "react-query";
import { MiniLoading } from "../Loading";

function ContentView({ id }: IPropsContentView) {
  const post = useQuery(["ContentViewModal", id], async () => {
    if (id === "") {
      return;
    }
    return await ContentEndPoints.getContentById(id);
  });

  const { data } = post;

  return (
    <>
      {post.isLoading || post.data == null ? (
        <MiniLoading />
      ) : (
        <article
          className=" flex-col flex gap-5 bg-white rounded-md py-4 h-full"
          key={id}
        >
          <div className="flex justify-between px-4">
            <div className="flex gap-3 items-center">
              <img
                src={"https://ui-avatars.com/api/" + data?.data.author}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-xs text-gray-500">
                  {data?.data.author ? data?.data.author : "Author"}
                </p>
                <p className="text-xs text-gray-500">
                  {data?.data.name ? data?.data.name : "Title of content"}
                </p>
                <h2 className="text-lg">
                  {data?.data.description
                    ? data?.data.description
                    : "Description"}
                </h2>
              </div>
            </div>
            <button>
              <EllipsisHorizontalIcon className="text-black w-6 h-6" />
            </button>
          </div>
          <div className="px-4">
            <div>
              {data?.data.content && data?.data.content.trim().length > 100
                ? data?.data.content.trim().substring(0, 100) +
                  "..." +
                  " Ler mais"
                : data?.data.content}
            </div>
          </div>

          {data?.data.attatchments && data?.data.attatchments.length > 0 && (
            <div className="flex-1 self-center aspect-[16/9] object-cover object-center rounded-sm carousel w-full">
              {data?.data.attatchments.map((item: any) => {
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
                } else if (item.mimetype.includes("audio")) {
                  return (
                    <audio
                      key={item.id}
                      id={item.id}
                      className="carousel-item w-full"
                      controls
                    >
                      <source src={item.url} type={item.mimetype} />
                    </audio>
                  );
                } else if (item.mimetype.includes("application/pdf")) {
                  return (
                    <div
                      key={item.id}
                      className="h-full w-full flex justify-center items-center cursor-pointer"
                      onClick={() => window.open(item.url, item.originalName)}
                    >
                      <iframe
                        src={item.url}
                        className="w-full h-full"
                        title={item.originalName}
                      ></iframe>
                    </div>
                  );
                } else if (item.mimetype.includes("application/")) {
                  return (
                    <div
                      key={item.id}
                      className="h-full w-full flex justify-center items-center cursor-pointer"
                      onClick={() => window.open(item.url, item.originalName)}
                    >
                      <FileTextIcon className="w-full h-full" />
                    </div>
                  );
                }
              })}
            </div>
          )}
        </article>
      )}
    </>
  );
}

export default ContentView;
