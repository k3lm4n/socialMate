// import { Fragment, useContext, useRef, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";

// import { useMutation, useQuery } from "react-query";
// import toast from "react-hot-toast";
// import { Controller, SubmitHandler, useForm, useFormContext } from "react-hook-form";
// import {
//   AddMembersSchema,
//   AddMembersType,
// } from "../../../utils/validator/chatChannel";
// import Loading from "../../Loading";
// import { CategoriesEndPoints, ChatEndPoints } from "../../../api/api";
// import Select from "react-select";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useParams } from "react-router-dom";
// import { ModalAddSubCourseContext } from "../../../context/ModalAddSubCourseContext";
// import { MappedCourses, Signup } from "../../../utils/types/@types";
// import { degrreOptions } from "../../../utils/categories";

// const notify = () =>
//   toast("Boa!!", {
//     icon: "👏",
//     duration: 3000,
//   });

// export default function ModalAddSubCourse() {
//   const ctx = useContext(ModalAddSubCourseContext);

//   const [selectedOptions, setSelectedOptions] = useState<MappedCourses[]>([]);


//   const categories = useQuery("categoriesCourses", async () => {
//     const { data } = await CategoriesEndPoints.getCategories();
//     return data;
//   });

//   const { channelId } = useParams<{ channelId: string }>();

//   const { mutateAsync, isLoading } = useMutation(
//     (data: AddMembersType) => ChatEndPoints.joinChannel(data),
//     {
//       onSuccess: () => {
//         ctx.handle();
//         notify();
//       },
//     }
//   );

//   const { status, data: options } = useQuery("usersPerOptions", async () => {
//     const { data } = await ChatEndPoints.getCreateOptionsChannel();
//     return data;
//   });

//   const { data: members } = useQuery(["channelUnique", channelId], () =>
//     ChatEndPoints.getChannel(channelId)
//   );

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<AddMembersType>({
//     resolver: zodResolver(AddMembersSchema),
//   });

//   const onSubmit: SubmitHandler<AddMembersType> = async (req) => {
//     await mutateAsync(req);
//   };

//   const MappedMembers = members?.data.members.map(
//     (member: { id: string; name: string }) => {
//       return {
//         value: member.id,
//         label: member.name,
//       };
//     }
//   );

//   const mapMembers = options?.users.filter((user: any) => {
//     return !MappedMembers?.some((member: any) => member.value === user.value);
//   });

//   register("channel", { value: channelId });

//   const cancelButtonRef = useRef(null);

//   return (
//     <>
//       {isLoading && <Loading />}
//       <Transition.Root show={ctx.isOpen} as={Fragment}>
//         <Dialog
//           as="div"
//           className="relative z-10"
//           initialFocus={cancelButtonRef}
//           onClose={ctx.handle}
//         >
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//           </Transition.Child>

//           <div className="fixed inset-0 z-10 overflow-y-auto">
//             <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                 enterTo="opacity-100 translate-y-0 sm:scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                 leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               >
//                 <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
//                   <form
//                     onSubmit={handleSubmit(onSubmit, (error) =>
//                       console.error(error)
//                     )}
//                   >
//                     <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
//                       <div className="sm:flex sm:items-start">
//                         <div className="space-y-12">
//                           <div className="border-b border-gray-900/10 pb-12">
//                             <h2 className="text-base font-semibold leading-7 text-gray-900">
//                               Selecione os mebros que pretende adicionar ao
//                               canal
//                             </h2>
//                             <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//                               <div className="col-span-full">
//                                 <label
//                                   htmlFor="members"
//                                   className="block text-sm font-medium leading-6 text-gray-900"
//                                 >
//                                   Membros
//                                 </label>
//                                 <Controller
//                                   control={control}
//                                   name="degree"
//                                   render={({ field: { onChange } }) => (
//                                     <Select
//                                       options={degrreOptions}
//                                       onChange={(e) => onChange(e?.value || "")}
//                                     />
//                                   )}
//                                 />
//                                 {errors.errors.degree?.message && (
//                                   <p className="text-red-600 text-xs">
//                                     {errors.errors.degree?.message}
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//                       <button
//                         type="submit"
//                         className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
//                       >
//                         Adicionar
//                       </button>
//                       <button
//                         type="button"
//                         className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
//                         onClick={() => ctx.handle()}
//                         ref={cancelButtonRef}
//                       >
//                         Cancelar
//                       </button>
//                     </div>
//                   </form>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition.Root>
//     </>
//   );
// }
