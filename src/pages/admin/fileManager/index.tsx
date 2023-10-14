import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Table from "../../../components/Table";
import { typesTable } from "../../../utils/typesTable";
import { useQuery } from "react-query";
import { FileEndPoints } from "../../../api/api";
import { MiniLoading } from "../../../components/Loading";

export default function FilesManager() {
  const { data, status } = useQuery("files", async () =>
    FileEndPoints.getFiles()
  );

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="w-full flex justify-between items-center text-center px-4 pt-3">
        <h1 className="text-3xl font-bold ">Gestor de Ficheiros</h1>
        <form className="flex flex-row items-center gap-2 ">
          <div className="relative lg:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </span>
            <input
              type="search"
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-100 focus:border-blue-100   "
            />
          </div>
          <button
            type="submit"
            className="btn"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Buscar
          </button>
        </form>
      </div>
      <div className="flex flex-col w-full h-full  overflow-auto">
        {status === "loading" ? (
          <div className="w-full h-full flex justify-center items-center">
            <MiniLoading />
          </div>
        ) : status === "error" ? (
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-xl text-red-600">Erro ao carregar os dados</h1>
          </div>
        ) : (
          <Table type={typesTable.GestordeFicheiros} dataFile={data?.data} />
        )}
      </div>
    </div>
  );
}
