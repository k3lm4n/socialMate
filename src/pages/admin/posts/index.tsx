import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import { posts } from "../../../utils/dbJson";
import PostCard from "../../../components/PostCard";
import { useQuery } from "react-query";
import { PostEndPoints } from "../../../api/api";

export default function Posts() {
  const getPosts = useQuery(
    "posts",
    async () => await PostEndPoints.getAllPost()
  );

  function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  console.log(getPosts.data);

  return (
    <div className="flex flex-col w-full h-full gap-4 px-4">
      <div className="w-full flex justify-between items-center text-center px-4 pt-3">
        <h1 className="text-3xl font-bold ">Posts</h1>
        <form className="flex flex-row items-center gap-2 ">
          <div className="relative lg:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </span>
            <input
              type="search"
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-100 focus:border-blue-100   "
            />
          </div>
          <button
            type="submit"
            className="btn"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Buscar
          </button>
        </form>
      </div>
      <div className="flex flex-col px-4 w-full h-full overflow-auto pt-4 ">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-y-8 gap-x-8 content-center justify-center">
          {getPosts.data?.data.map((post: any) => (
            <PostCard
              key={post.id}
              id={post.id}
              content={post.content}
              title={post.title}
              image={posts[randomIntFromInterval(7, 0)].image}
              interest={post.subCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
