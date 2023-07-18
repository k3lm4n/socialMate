import { typesTable } from "../../utils/typesTable";

import ChannelLine from "./Lines/ChannelLine";
import CourseLine from "./Lines/CourseLine";
import FileLine from "./Lines/FileLine";
import InterestLine from "./Lines/InterestLine";
import UserLine from "./Lines/UserLine";


type Props = {
  type: string;
  dataUser?: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    course: string;
    degree: string;
  }[];
  dataFile?: {
    id: string;
    name: string;
    owner: string;
    createdAt: string;
  }[];
  dataCourse?: {
    id: string;
    name: string;
    sigle: string;
    users: string;
    subCourses: string;
  }[];
  dataInterests?: {
    id: string;
    name: string;
    sigle: string;
    users: string;
    course: string;
  }[];
  dataChannel?: {
    id: string;
    name: string;
    users: string;
    createdAt: string;
  }[];
};

export default function Table({
  type,
  dataCourse,
  dataFile,
  dataInterests,
  dataUser,
  dataChannel,
}: Props) {
  console.log("====================================");
  console.log(type);
  console.log("====================================");

  return (
    <ul role="list" className="divide-y divide-gray-100 w-full h-full">
      {(type === typesTable.Utilizadores &&
        dataUser &&
        dataUser.length > 0 &&
        dataUser?.map((user) => (
          <UserLine
            avatar={user.avatar}
            course={user.course}
            degree={user.degree}
            email={user.email}
            id={user.id}
            name={user.name}
            key={user.id}
          />
        ))) ||
        (type === typesTable.Canais &&
          dataCourse &&
          dataCourse.length > 0 &&
          dataCourse?.map((course) => (
            <CourseLine
              id={course.id}
              name={course.name}
              sigle={course.sigle}
              users={course.users}
              key={course.id}
            />
          ))) ||
        (type === typesTable.GestordeFicheiros &&
          dataFile &&
          dataFile.length > 0 &&
          dataFile?.map((file) => (
            <FileLine
              id={file.id}
              name={file.name}
              owner={file.owner}
              createdAt={file.createdAt}
              key={file.id}
            />
          ))) ||
        (type === typesTable.Interresses &&
          dataInterests &&
          dataInterests.length > 0 &&
          dataInterests?.map((interest) => (
            <InterestLine
              id={interest.id}
              name={interest.name}
              sigle={interest.sigle}
              users={interest.users}
              key={interest.id}
              course={interest.course}
            />
          ))) ||
        (type === typesTable.Canais &&
          dataChannel &&
          dataChannel.length > 0 &&
          dataChannel?.map((channel) => (
            <ChannelLine
              id={channel.id}
              name={channel.name}
              createdAt={channel.createdAt}
              key={channel.id}
              users={channel.users}
            />
          ))) || (
          <div className="w-full h-full flex flex-col justify-center items-center ">
            <h1 className="text-xl font-bold font-productsans">
              Não existem dados a serem listados
            </h1>
          </div>
        )}
    </ul>
  );
}
