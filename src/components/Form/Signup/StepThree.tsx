import { useFormContext } from "react-hook-form";
import { Signup } from "../../../utils/types/@types";


export default function StepThree() {
  const { register , formState:errors } = useFormContext<Signup>();

  return (
    <div className="grid grid-rows-2 grid-flow-row w-full gap-8">
      <div className="grid grid-flow-col my-2 gap-4">
        <div className="sm:col-span-1">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Username
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
              <input
                type="text"
                id="username"
                {...register("username")}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="k3lm4n"
              />
              {errors.errors.username?.message && (
              <p className="text-red-600 text-xs">{errors.errors.username?.message}</p>
            )}
            </div>
          </div>
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="mt-2">
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="201800000@isptec.co.ao"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            {errors.errors.email?.message && (
              <p className="text-red-600 text-xs">{errors.errors.email?.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 grid-flow-col">
        <div className="sm:col-span-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Telefone
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
              <input
                type="text"
                id="phone"
                {...register("phone")}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="+244 900 000 000"
              />
              {errors.errors.phone?.message && (
              <p className="text-red-600 text-xs">{errors.errors.phone?.message}</p>
            )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-flow-col gap-4">
        <div className="sm:col-span-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900" 
          >
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              type="password"
              {...register("password")}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            {errors.errors.password?.message && (
              <p className="text-red-600 text-xs">{errors.errors.password?.message}</p>
            )}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Confirm your password
          </label>
          <div className="mt-2">
            <input
              id="confirm-password"
              type="password"
              {...register("passwordConfirmation")}
              autoComplete="confirm-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            {errors.errors.passwordConfirmation?.message && (
              <p className="text-red-600 text-xs">{errors.errors.passwordConfirmation?.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
