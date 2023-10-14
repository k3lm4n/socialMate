import { Tab } from "@headlessui/react";
import UploaderContent from "../UploaderContent";
import ContentDisclosure from "../ContentDisclosure";
import TestExam from "../TestDisclosure";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function TabList() {
  return (
    <div className="w-full mx-4  sm:px-0">
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400",
              selected
                ? "bg-white shadow"
                : "text-blue-100 "
            )
          }
        >
          Adicionar Conteúdo
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400",
              selected
                ? "bg-white shadow"
                : "text-blue-100 "
            )
          }
        >
          Conteúdos
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400",
              selected
                ? "bg-white shadow"
                : "text-blue-100 "
            )
          }
        >
          Livros
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400",
              selected
                ? "bg-white shadow"
                : "text-blue-100 "
            )
          }
        >
          Exames e Testes
        </Tab>

        
      </Tab.List>
      <Tab.Panels className="mt-2">
        <Tab.Panel
          className={classNames(
            "rounded-xl bg-white p-3",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400"
          )}
        >
          <UploaderContent />
        </Tab.Panel>
        <Tab.Panel
          className={classNames(
            "rounded-xl bg-white p-3",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400"
          )}
        >
          <ContentDisclosure/>
          {/* <SearchList /> */}
        </Tab.Panel>
        <Tab.Panel
          className={classNames(
            "rounded-xl bg-white p-3",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400"
          )}
        >
          <ContentDisclosure/>
          {/* <SearchList /> */}
        </Tab.Panel>
        <Tab.Panel
          className={classNames(
            "rounded-xl bg-white p-3",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400"
          )}
        >
          <TestExam/>
          {/* <SearchList /> */}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  </div>
  )
}
