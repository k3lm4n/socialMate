import { PlusCircleIcon } from "@heroicons/react/20/solid";

export default function ItemSuggest() {
  return (
    <div className="flex flex-row items-center justify-between hover:bg-neutral-200 rounded-md">
      <div className="py-2 px-4 flex flex-row gap-4">
        <img
          src={"https://ui-avatars.com/api/UN"}
          className="w-10 h-10 rounded-full"
          alt="loren"
        />
        <div className="flex flex-col">
          <div className="text-sm font-semibold text-gray-800">
            <span className="text-gray-800">Username</span>
          </div>
          <div className="text-xs text-gray-500">
            <span className="text-gray-500">Name</span>
          </div>
        </div>
      </div>
      <div className="pr-4">
        <button>
          <PlusCircleIcon className="w-8 h-8 fill-green-500" />
        </button>
      </div>
    </div>
  );
}
