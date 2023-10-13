import { Tab } from "@headlessui/react";
import ActiveListCommunity from "../ActiveListCommunity/index";
import SearchList from "../SearchList";
import ActiveList from "../ActiveList";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

function TabsActiveList() {
  return (
    <div className="w-full max-w-md px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 ",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 "
              )
            }
          >
            Activos
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 ",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 "
              )
            }
          >
            Pesquisar
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 ",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 "
              )
            }
          >
            Criar Canal
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 "
            )}
          >
            <ActiveList />
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 "
            )}
          >
            <SearchList />
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 "
            )}
          >
            <ActiveListCommunity />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
export default TabsActiveList;
