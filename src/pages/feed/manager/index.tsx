import ExternalSideBar from "../../../components/ExternalSideBar";
import TabList from "../../../components/ManagerPane/TabList";

export default function Manager() {
  return (
    <>
      <ExternalSideBar />
      <div className="lg:w-[calc(100vw-5rem)] w-[calc(100vw-4rem)] mt-4 h-screen fixed right-0 bg-white rounded-tl-lg shadow-xl overflow-auto ">
        <div className="flex justify-center w-full pt-4 ">
          <TabList />
        </div>
      </div>
    </>
  );
}
