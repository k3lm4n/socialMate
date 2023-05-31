import {
  HandThumbUpIcon,
  BookmarkIcon,
  ChatBubbleLeftIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/outline";


const PostView = () => {
  return (
    <article className="flex-col flex gap-5 bg-white rounded-md py-4">
      <div className="flex justify-between px-4">
        <h2 className="text-lg">Title of content</h2>
        <button>
          <BookmarkIcon className="text-black w-6 h-6" />
        </button>
      </div>
      <img
        className="flex-1 self-center aspect-[16/9] object-cover object-center"
        src={"https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"}
        alt="lorem"
        width={600}
        height={400}
      />
      <div className="flex px-4 justify-center gap-8">
        <button className="hover:animate-bounce">
          <HandThumbUpIcon className="text-black w-6 h-6" />
        </button>
        <button className="hover:animate-bounce">
          <ChatBubbleLeftIcon className="text-black w-6 h-6" />
        </button>
        <button className="hover:animate-bounce">
          <ArrowPathRoundedSquareIcon className="text-black w-6 h-6" />
        </button>
      </div>
    </article>
  );
};

export default PostView;
