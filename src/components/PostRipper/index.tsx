import PostView from "../PostView";

export default function PostRipper() {
  return (
    <div className="overflow-y-scroll h-[calc(100vh-1rem)] lg:ml-8 lg:w-[55%] w-full  ">
      <div className="flex gap-4 flex-col mb-24 w-[98%] ">
        <PostView />
        <PostView />
        <PostView />
        <PostView />
        <PostView />
        <PostView />
        <PostView />
      </div>
    </div>
  );
}
