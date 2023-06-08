import { Controller, useFormContext } from "react-hook-form";
import { Signup } from "../../../utils/types/@types";
import Select from "react-select";
import { useState } from "react";
import { groupedOptions, GroupedOption } from "../../../utils/categories";


const mappedCourses = groupedOptions.map((data) => {
  return {
    label: data.label,
    value: data.value,
  };
});

const degrreOptions = [
  { label: "1º Ano", value: "1º Ano" },
  { label: "2º Ano", value: "2º Ano" },
  { label: "3º Ano", value: "3º Ano" },
  { label: "4º Ano", value: "4º Ano" },
  { label: "5º Ano", value: "5º Ano" },
];

export default function StepTwo() {
  const { control, formState: errors } = useFormContext<Signup>();

  const [selectedOptions, setSelectedOptions] = useState<GroupedOption[]>([]);


  const setHandle = (e: any) => {
    setSelectedOptions(Array.isArray(e) ? e.map((data) => data.label) : []);
  };

  return (
    <div className="grid grid-flow-row w-full ">
      <div className="grid grid-flow-col my-4 gap-4">
        <div className="sm:col-span-1">
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Curso
            </label>

            <div className="flex flex-wrap items-center lg:justify-between justify-center">
              <div className=" block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">
                <Controller
                  name="course"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Select
                      options={mappedCourses}
                      onChange={(e) => onChange(e?.value || "")}
                    />
                  )}
                />
                {errors.errors.course?.message && (
                  <p className="text-red-600 text-xs">
                    {errors.errors.course?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="sm:col-span-1">
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Ano
            </label>

            <div className="flex flex-wrap items-center lg:justify-between justify-center">
              <div className=" block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">
                <Controller
                  control={control}
                  name="degree"
                  render={({ field: { onChange } }) => (
                    <Select
                      options={degrreOptions}
                      onChange={(e) => onChange(e?.value || "")}
                    />
                  )}
                />
                {errors.errors.degree?.message && (
                  <p className="text-red-600 text-xs">
                    {errors.errors.degree?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-flow-col my-4 gap-4">
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Interesses
          </label>

          <div className="flex flex-wrap items-center lg:justify-between justify-center">
            <div className=" block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">
              <Controller
                control={control}
                name="interest"
                render={({ field: { onChange } }) => (
                  <Select
                    isMulti
                    options={groupedOptions}
                    onChange={(e) => {
                      onChange(e);
                      setHandle(e);
                    }}
                  />
                )}
              />
              {errors.errors.interest?.message && (
                <p className="text-red-600 text-xs">
                  {errors.errors.interest?.message}
                </p>
              )}
            </div>
            <div>
              {selectedOptions.map((h, index) => {
                return <p key={index}>{h.label}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
