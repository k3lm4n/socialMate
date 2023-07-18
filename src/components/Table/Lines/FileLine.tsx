import ActionsOnTable from "../ActionsOnTable";
import dayjs from "dayjs";

type UserProps = {
  id: string;
  name: string;
  owner: string;
  createdAt: string;
};

export default function FileLine(data: UserProps) {
  return (
    <li key={data.id} className="flex justify-between gap-x-6 py-5">
      <div className="flex gap-x-4">
        <img
          className="h-12 w-12 flex-none rounded-full bg-gray-50"
          src={"https://ui-avatars.com/api/" + data.name}
          alt=""
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {data.name}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {data.owner}
          </p>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="hidden sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">Data de Criação</p>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            {dayjs(data.createdAt).format("DD/MM HH:mm")}
          </p>
        </div>
        <div className="pr-8">
          <ActionsOnTable />
        </div>
      </div>
    </li>
  );
}
