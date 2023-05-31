import Chat from "../Chat";

const CommunitySpace = () => {
  return (
    <div  className=" lg:w-[calc(100vw-23rem)]  lg:h-[calc(100vh-4.7rem)] max-md:h-[calc(100vh-4.7rem)]  mt-4 right-0 fixed  bottom-0  w-[calc(100vw-4rem)] 
    max-sm:w-full h-full  max-sm:rounded-none  md:mt-4  bg-gray-50 lg:rounded-tl-none md:rounded-tl-xl  border-l-[1px] border-l-gray-200/80">
      <div className="p-4 h-full">
        <Chat />
      </div>
    </div>
  );
};

export default CommunitySpace;
