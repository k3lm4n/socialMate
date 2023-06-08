import { useFormContext } from "react-hook-form";
import { Signup } from "../../../utils/types/@types";

export default function StepOne() {
  const { register, formState: errors } = useFormContext<Signup>();

  return (
    <div className="grid grid-flow-row w-full ">
      <div className="grid grid-flow-col my-4 gap-4 ">
        <div className="sm:col-span-1">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Nome Próprio
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="first-name"
              {...register("name")}
              placeholder="Kelman"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            {errors.errors.name?.message && (
              <p className="text-red-600 text-xs">{errors.errors.name?.message}</p>
            )}
          </div>
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Sobrenome
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="last-name"
              {...register("lastname")}
              placeholder="Dias dos Santos"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            {errors.errors.lastname?.message && (
              <p className="text-red-600 text-xs">{errors.errors.lastname?.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 grid-flow-col my-4 gap-4 ">
        <div className="sm:col-span-2">
          <label
            htmlFor="birthdate"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Data de Nascimento
          </label>
          <div className="mt-2">
            <input
              type="date"
              id="birthdate"
              {...register("birthdate")}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            {errors.errors.birthdate?.message && (
              <p className="text-red-600 text-xs">{errors.errors.birthdate?.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 grid-flow-col my-4 gap-4 ">
        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Morada
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="address"
              {...register("address")}
              placeholder=""
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            {errors.errors.address?.message && (
              <p className="text-red-600 text-xs">{errors.errors.address?.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
