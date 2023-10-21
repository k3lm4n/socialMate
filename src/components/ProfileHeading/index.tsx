import {
  BriefcaseIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { MiniLoading } from "../Loading";

export default function ProfileHeading() {
  const ctx = useContext(AuthContext);

  return (
    <>
      {ctx.user ? (
        <div className="lg:flex lg:items-center lg:justify-between w-full px-4 pb-4 ">
          <div className="min-w-0 flex-1 flex gap-x-4 items-center">
            <div>
              <img
                src={
                  "https://ui-avatars.com/api/" +
                  ctx.user.name +
                  " " +
                  ctx.user.lastname
                }
                alt="Profile"
                width={42}
                height={42}
                className="h-12 w-12 rounded-full"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {ctx.user.name + " " + ctx.user.lastname}
              </h2>
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <BriefcaseIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {ctx.user.course}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <MapPinIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {ctx.user.address}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <CalendarIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {dayjs(ctx.user.birthdate).format("DD/MM/YYYY")}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <MiniLoading />
      )}
    </>
  );
}
