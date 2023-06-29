import PostView from "../PostView";

const DiscoverySpace = () => {
  return (
    <div className="lg:w-[calc(100vw-23rem)] w-[calc(100vw-4rem)] max-sm:w-full h-full max-sm:mt-0 max-sm:rounded-none  md:mt-4 mt-12 right-0 fixed bg-gray-50 lg:rounded-tl-none md:rounded-tl-xl  border-l-[1px] border-l-gray-200/80 ">
      <div className="m-4">
        <h1 className="m-4">Space Discovery</h1>
        <div className="overflow-y-scroll h-[calc(100vh-6rem)]">
          <div className="grid grid-cols-1 gap-4 content-center justify-center">
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverySpace;
