import { DashboardEndPoints } from "../../../api/api";
import PieChartCard from "../../../components/Charts/PieChart";
import Widget from "../../../components/widget";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { useQuery } from "react-query";

const Dashboard = () => {
  const countPost = useQuery("countPost", async () => {
    const { data } = await DashboardEndPoints.getPostCount();
    return data;
  });
  const countContent = useQuery("countContent", async () => {
    const { data } = await DashboardEndPoints.getContentCount();
    return data;
  });
  const countCourses = useQuery("countCourses", async () => {
    const { data } = await DashboardEndPoints.getCoursesCount();
    return data;
  });
  const countSubcourses = useQuery("countSubcourses", async () => {
    const { data } = await DashboardEndPoints.getSubcourses();
    return data;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy-700 p-4">Dashboard</h1>
      <div className="w-full h-full flex flex-col">
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* <TotalChart /> */}
          <div className="grid grid-rows-1 gap-5 md:grid-rows-3">
            <Widget
              icon={<UserGroupIcon className="h-6 w-6" />}
              title={"Conteúdos"}
              subtitle={countContent.data?.content}
            />
            <Widget
              icon={<UserGroupIcon className="h-7 w-7" />}
              title={"Posts"}
              subtitle={countPost.data?.post}
            />
            <Widget
              icon={<UserGroupIcon className="h-7 w-7" />}
              title={"Cursos"}
              subtitle={countCourses.data?.category}
            />
            <Widget
              icon={<UserGroupIcon className="h-6 w-6" />}
              title={"Disciplinas"}
              subtitle={countSubcourses.data?.subCategory}
            />
          </div>
          <PieChartCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
