import PieChartCard from "../../../components/Charts/PieChart";
import TotalChart from "../../../components/Charts/TotalChart";
import Widget from "../../../components/widget";
import { UserGroupIcon } from "@heroicons/react/24/solid";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-navy-700 dark:text-white p-4">
        Dashboard
      </h1>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 max-xl:grid-cols-6">
        <Widget
          icon={<UserGroupIcon className="h-7 w-7" />}
          title={"Earnings"}
          subtitle={"$340.5"}
        />
        <Widget
          icon={<UserGroupIcon className="h-6 w-6" />}
          title={"Spend this month"}
          subtitle={"$642.39"}
        />
        <Widget
          icon={<UserGroupIcon className="h-7 w-7" />}
          title={"Sales"}
          subtitle={"$574.34"}
        />
         <Widget
          icon={<UserGroupIcon className="h-7 w-7" />}
          title={"Earnings"}
          subtitle={"$340.5"}
        />
        <Widget
          icon={<UserGroupIcon className="h-6 w-6" />}
          title={"Spend this month"}
          subtitle={"$642.39"}
        />
        <Widget
          icon={<UserGroupIcon className="h-7 w-7" />}
          title={"Sales"}
          subtitle={"$574.34"}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalChart />
        <PieChartCard />
      </div>

    </div>
  );
};

export default Dashboard;
