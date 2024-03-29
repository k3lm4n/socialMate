import { ChangeEvent, Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery } from "react-query";
import toast from "react-hot-toast";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Loading from "../../Loading";
import {
  CategoriesEndPoints,
  PostEndPoints,
  UploadEndpoint,
} from "../../../api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalCreatePostContext } from "../../../context/ModalCreatePostContext";
import { PostSchemaType, postSchema } from "../../../utils/validator/post";
import Select from "react-select";
import {
  DocumentIcon,
  FilmIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Editor } from "@tinymce/tinymce-react";
// import 'tinymce/plugins/code';
// import tinymce from 'tinymce/tinymce';
// import 'tinymce/plugins/code';

const notify = () =>
  toast("Boa!!", {
    icon: "👏",
    duration: 3000,
  });

type IFile = {
  url: any;
  originalName: string;
  mimetype: string;
  file: File;
};

export default function ModalCreatePost() {
  const editorRef = useRef(null) as any;
  const ctx = useContext(ModalCreatePostContext);
  const { status, data } = useQuery("categoriesFetch", async () => {
    const { data } = await CategoriesEndPoints.getCategories();
    return data;
  });

  const [files, setFiles] = useState<IFile[]>([]);

  const handleMultipleImages = (evnt: ChangeEvent<HTMLInputElement>) => {
    const targetFiles = evnt.target.files;
    if (!targetFiles) return;
    const newFiles: (File | null)[] = [];
    for (let index = 0; index < targetFiles?.length; index++) {
      newFiles.push(targetFiles.item(index));
    }
    if (newFiles.some((file) => !file)) return;
    const newIFiles: IFile[] = newFiles.map((file) => ({
      mimetype: file?.type!,
      originalName: file?.name!,
      url: URL.createObjectURL(file!),
      file: file!,
    }));
    setFiles((oldValue) => [...oldValue, ...newIFiles]);
  };

  function handleRemoveImage(index: any) {
    const selectedFIles = [...files];
    selectedFIles.splice(index, 1);
    setFiles(selectedFIles);
  }

  const postCreationMutation = useMutation(
    (data: PostSchemaType) => PostEndPoints.createPost(data),
    {
      onSuccess: () => {
        ctx.handle();
        notify();
      },
    }
  );

  const uploadMutation = useMutation((files: IFile[]) =>
    Promise.all(files.map(({ file }) => UploadEndpoint.uploadFile(file)))
  );

  const isLoading = postCreationMutation.isLoading || uploadMutation.isLoading;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostSchemaType>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit: SubmitHandler<PostSchemaType> = async (req) => {
    if (files.length > 0) {
      let filesResponseMapped: {
        url: string;
        mimetype: string;
        originalName: string;
      }[] = [];
      uploadMutation.mutateAsync(files).then((response) => {
        filesResponseMapped = response.map((res) => {
          return res;
        });
        postCreationMutation.mutateAsync({
          attatchments: filesResponseMapped,
          ...req,
        });
      });
    } else {
      await postCreationMutation.mutateAsync(req);
    }
  };

  const cancelButtonRef = useRef(null);

  return (
    <>
      {isLoading && <Loading />}
      <Transition.Root show={ctx.isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 w-full"
          initialFocus={cancelButtonRef}
          onClose={ctx.handle}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity w-full" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className={
                    " relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all duration-300  sm:my-8 sm:w-[98%] sm:max-w-7xl "
                    //  "relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition sm:my-8 sm:ease-in-out duration-300 sm:max-w-lg"
                  }
                >
                  <form
                    onSubmit={handleSubmit(onSubmit, (error) =>
                      console.error(error)
                    )}
                  >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="w-full flex justify-end items-center">
                        <h2 className="w-full text-base font-semibold leading-7 text-gray-900">
                          Criando um novo post
                        </h2>
                      </div>
                      <div className="sm:flex sm:items-start w-full">
                        <div className="space-y-12 w-full">
                          <div className="border-b border-gray-900/10 pb-12">
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                              Essas informações serão exibidas publicamente,
                              portanto, tenha cuidado com o que você
                              compartilha.
                            </p>
                            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                              <div className="col-span-full">
                                <label
                                  htmlFor="title"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Título
                                </label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300   sm:max-w-md">
                                    <input
                                      type="text"
                                      id="title"
                                      {...register("title")}
                                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="Programação II"
                                      required
                                    />
                                    {errors.title && (
                                      <p className="text-red-600 text-xs">
                                        {errors.title.message}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-full">
                                <div className="col-span-full">
                                  <Controller
                                    control={control}
                                    name="content"
                                    render={({
                                      field: { onChange, value },
                                    }) => (
                                      <Editor
                                        value={value}
                                        onEditorChange={onChange}
                                        onInit={(editor) =>
                                          (editorRef.current = editor)
                                        }
                                        apiKey={
                                          import.meta.env.VITE_API_KEY_TINYMCE
                                        }
                                        init={{
                                          height: 400,
                                          menubar: true,

                                          plugins: [
                                            "advlist autolink lists link image charmap print preview anchor code codesample",
                                            "searchreplace visualblocks code fullscreen",
                                            "insertdatetime media table paste code help wordcount ",
                                          ],
                                          toolbar:
                                            "undo redo | formatselect | " +
                                            "bold italic backcolor | alignleft aligncenter | code |" +
                                            "alignright alignjustify | bullist numlist outdent indent | " +
                                            "removeformat | help",
                                          content_style:
                                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                        }}
                                      />
                                    )}
                                  />
                                  <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Assunto a ser abordado
                                  </p>
                                </div>
                                <div className="col-span-full">
                                  <div className="col-span-full">
                                    <label
                                      htmlFor="category"
                                      className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                                    >
                                      Categoria
                                    </label>
                                    {status === "success" && (
                                      <Controller
                                        name="category"
                                        control={control}
                                        render={({ field: { onChange } }) => (
                                          <Select
                                            isMulti
                                            options={data.mappedCategories}
                                            onChange={(e) => {
                                              onChange(e);
                                            }}
                                          />
                                        )}
                                      />
                                    )}
                                    {errors.category?.message && (
                                      <p className="text-red-600 text-xs">
                                        {errors.category?.message}
                                      </p>
                                    )}
                                  </div>

                                  <div className="col-span-full mt-2">
                                    <label
                                      htmlFor="cover-photo"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Anexar Ficheiro
                                    </label>
                                    <div className="mt-2 flex flex-row justify-center rounded-lg border border-dashed border-gray-900/25 w-full ">
                                      <div className="flex flex-row w-full">
                                        <div className="flex flex-row items-center">
                                          {/* <div> */}
                                          {files.length == 0 ? (
                                            <PhotoIcon
                                              className="h-12 w-12 text-gray-300"
                                              aria-hidden="true"
                                            />
                                          ) : (
                                            files.map(
                                              (file: IFile, index: any) => (
                                                <div
                                                  key={index}
                                                  className="flex justify-end"
                                                >
                                                  <XCircleIcon
                                                    className=" stroke-error h-5 w-5 fill-black absolute hover:cursor-grab"
                                                    onClick={() => {
                                                      handleRemoveImage(index);
                                                    }}
                                                  />
                                                  {file.mimetype.includes(
                                                    "image"
                                                  ) ? (
                                                    <img
                                                      src={file.url}
                                                      alt="lorem"
                                                      className="self-center aspect-[16/9] object-cover object-center h-20 w-20 rounded-sm"
                                                    />
                                                  ) : file.mimetype.includes(
                                                      "video"
                                                    ) ? (
                                                    <div>
                                                      <FilmIcon className="mx-auto h-12 w-12 text-gray-300" />
                                                      <span className="text-xs">
                                                        {file.originalName}
                                                      </span>
                                                    </div>
                                                  ) : (
                                                    <div>
                                                      <DocumentIcon className="mx-auto h-12 w-12 text-gray-300" />
                                                      <span className="text-xs">
                                                        {file.originalName}
                                                      </span>
                                                    </div>
                                                  )}
                                                </div>
                                              )
                                            )
                                          )}
                                        </div>

                                        <div className="flex text-sm leading-6 text-gray-600 justify-center items-center">
                                          <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                                          >
                                            <span>Selecione</span>
                                            <input
                                              id="file-upload"
                                              name="file"
                                              type="file"
                                              className="sr-only"
                                              onChange={handleMultipleImages}
                                              multiple
                                            />
                                          </label>
                                        </div>
                                        {/* <p className="pl-1">or drag and drop</p> */}
                                      </div>
                                      {/* <p className="text-xs leading-5 text-gray-600">
                                          PNG, JPG, Video, PDF
                                        </p> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      >
                        Criar
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={(e) => {
                          e.preventDefault();
                          ctx.handle();
                        }}
                        ref={cancelButtonRef}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
