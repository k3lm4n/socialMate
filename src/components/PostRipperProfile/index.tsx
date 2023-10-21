import { useQuery } from "react-query";
import PostView from "../PostView";
import { PostEndPoints } from "../../api/api";
import { MiniLoading } from "../Loading";
import { IPropsPost } from "../../utils/types/@types";

export default function PostRipperProfile() {
  const { data, isLoading, isError } = useQuery(
    "MinesPosts",
    PostEndPoints.getAllMy
  );

  return (
    <div className="overflow-y-scroll h-[calc(100vh-1rem)] lg:ml-8 lg:w-[55%] w-full  ">
      <div className="flex gap-4 flex-col mb-24 w-[98%] ">
        {isLoading ? (
          <div className="w-full h-screen flex justify-center items-center">
            <MiniLoading />
          </div>
        ) : isError ? (
          <span></span>
        ) : data.length > 0 ? (
          data.map((post: IPropsPost, index: any) => {
            return (
              <div className="rounded-lg border" key={index}>
                <PostView
                  id={post.id}
                  author={post.author}
                  content={post.content}
                  title={post.title}
                  attatchments={post.attatchments}
                />
              </div>
            );
          })
        ) : (
          <div className="w-full h-screen flex justify-center items-center">
            <h1 className="text-xl text-justify">
              De momento não existem posts do seu interesse
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
