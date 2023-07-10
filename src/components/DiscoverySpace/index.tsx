import PostRipper from "../PostRipper";
import Suggestions from "../Suggestions";

const DiscoverySpace = () => {
  return (
    <div className="lg:w-[calc(100vw-21rem)] w-[calc(100vw-4rem)] max-sm:w-full h-full max-sm:mt-0 max-sm:rounded-none  md:mt-4 mt-12 right-0 fixed bg-gray-50 lg:rounded-tl-none md:rounded-tl-xl  border-l-[1px] border-l-gray-200/80 ">
      <div className=" m-4 px-8 text-2xl ">Space Discovery</div>
      <div className="m-4 flex flex-row">
        <PostRipper />
        <Suggestions />
      </div>
    </div>
  );
};

export default DiscoverySpace;
