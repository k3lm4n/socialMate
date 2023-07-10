import ItemSuggest from "../ItemSuggest";

export default function Suggestions() {
  return (
    <div className=" lg:w-[40%] flex justify-end  ">
      <div className=" w-80 h-96 hidden lg:block mx-4 rounded-md border border-neutral-200 p-2 bg-white ">
        <div className="w-full h-96 ">
          <div className="text-lg text-neutral-600 pb-1 pt-2 mx-2 border-b">
            Sugestões
          </div>
          <div className="flex flex-col overflow-y-auto h-80">
            <ItemSuggest />
            <ItemSuggest />
            <ItemSuggest />
            <ItemSuggest />
            <ItemSuggest />
            <ItemSuggest />
            <ItemSuggest />
            <ItemSuggest />
            <ItemSuggest />
          </div>
        </div>
      </div>
    </div>
  );
}
