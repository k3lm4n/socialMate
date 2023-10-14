import PieChart from "./PieCharts";
import { pieChartOptions } from "../../utils/variables/charts";
import Card from "../card";
import { useQuery } from "react-query";
import { DashboardEndPoints } from "../../api/api";
import { Fragment } from "react";
import { MiniLoading } from "../Loading";

const PieChartCard = () => {
  const byYear = useQuery("categories", async () => {
    const { data } = await DashboardEndPoints.getUserByYear();
    return data;
  });

  const colors = [
    "h-2 w-2 rounded-full bg-[#c5edd1]",
    "h-2 w-2 rounded-full bg-[#cdd6dd]",
    "h-2 w-2 rounded-full bg-[#fed5ca]",
    "h-2 w-2 rounded-full bg-[#bdcfff]",
    "h-2 w-2 rounded-full bg-[#8171FC]",
  ];

  const pieChartData = byYear.data?.map((item: any) => item.count);

  return (
    <>
      {byYear.isLoading ? (
        <MiniLoading />
      ) : (
        <Card extra="rounded-2xl p-3">
          <div className="flex flex-row justify-between px-3 pt-2">
            <div>
              <h4 className="text-lg font-bold text-navy-700 ">
                Usuários por ano
              </h4>
            </div>
          </div>

          <div className="mb-auto flex h-[250px] w-full items-center justify-center">
            <PieChart chartOptions={pieChartOptions} chartData={pieChartData} />
          </div>
          <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 ">
            <div className="h-11 w-px bg-gray-300 " />

            {byYear.data?.map((item: any, index: any) => (
              <Fragment key={index}>
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center">
                    <div className={colors[index]} />
                    <p className="ml-1 text-sm font-normal text-gray-600">
                      {item.degree}
                    </p>
                  </div>
                  <p className="mt-px text-xl font-bold text-navy-700  ">
                    {item.count}
                  </p>
                </div>

                <div className="h-11 w-px bg-gray-300 " />
              </Fragment>
            ))}
          </div>
        </Card>
      )}
    </>
  );
};

export default PieChartCard;
