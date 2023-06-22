import { useQuery } from "react-query";
import { SearchEndPoints } from "../../api/api";
import { useState } from "react";
import { MiniLoading } from "../Loading";

export default function SearchList() {
  const [query, setQuery] = useState("");
  const { isLoading, data: resp } = useQuery(
    ["searchList", query],
    async () => {
      const { data } = await SearchEndPoints.search(query);
      return data;
    }
  );

  console.log("====================================");

  console.log(resp);
  console.log("====================================");

  return (
    <div className="space-y-12">
      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label
            htmlFor="searchList"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Pesquisar por pessoas e comunidades
          </label>
          <div className="mt-4">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
              <input
                type="text"
                name="searchList"
                id="searchList"
                autoComplete="searchList"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder=""
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <MiniLoading />
        ) : !resp ? (
          <span></span>
        ) : (
          resp.map(
            (info: {
              id: string;
              name: string;
              username: string;
              degree: string;
              course: string;
              category: string;
            }) => (
              <li key={info.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={"https://ui-avatars.com/api/" + info.name}
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {info.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {info.username ? "@" + info.username : info.category}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {info.degree ? info.degree : "Comunidade"}
                  </p>
                  {info.category ? (
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {/* Last seen{" "}
                      <time dateTime={info.lastSeenDateTime}>
                        {info.lastSeen}
                      </time> */}
                    </p>
                  ) : (
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-xs leading-5 text-gray-500">
                        {info.course}
                      </p>
                    </div>
                  )}
                </div>
              </li>
            )
          )
        )}
      </ul>
    </div>
  );
}
