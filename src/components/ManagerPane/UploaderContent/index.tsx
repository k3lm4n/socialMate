import { ChangeEvent, Fragment, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery } from "react-query";
import toast from "react-hot-toast";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  CategoriesEndPoints,
  ContentEndPoints,
  UploadEndpoint,
} from "../../../api/api";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AttachmentSchemaType,
  AttachmentSchema,
} from "../../../utils/validator/attachment";
import Select from "react-select";
import {
  DocumentIcon,
  FilmIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import Loading from "../../Loading";

const plans = [
  {
    discriminator: "Livros e artigos",
    value: "BOOK",
  },
  {
    discriminator: "Material de Apoio",
    value: "FILE",
  },
  {
    discriminator: "Exames e provas",
    value: "TEST_FILE",
  },
];

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

export default function UploaderContent() {
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

  const contentCreationMutation = useMutation(
    (data: AttachmentSchemaType) => ContentEndPoints.createContent(data),
    {
      onSuccess: () => {
        setValue("description", "");
        setFiles([]);
        notify();
      },
    }
  );

  const uploadMutation = useMutation((files: IFile[]) =>
    Promise.all(files.map(({ file }) => UploadEndpoint.uploadFile(file)))
  );

  const isLoading =
    contentCreationMutation.isLoading || uploadMutation.isLoading;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<AttachmentSchemaType>({
    resolver: zodResolver(AttachmentSchema),
  });

  const onSubmit: SubmitHandler<AttachmentSchemaType> = async (req) => {
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
        contentCreationMutation.mutateAsync({
          attatchments: filesResponseMapped,
          ...req,
        });
      });
    } else {
      await contentCreationMutation.mutateAsync(req);
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      <form
        onSubmit={handleSubmit(onSubmit, (error) => console.error(error))}
        className="flex flex-col items-center "
      >
        <div className="bg-white px-4 pb-4 pt-2 sm:p-6 sm:pb-4 sm:max-w-lg">
          <div className="w-full flex justify-end items-center">
            <h2 className="w-full text-base font-bold leading-7 text-gray-900">
              Adicionando um novo conteúdo
            </h2>
          </div>
          <div className="flex items-start w-full ">
            <div className="space-y-12 w-full">
              <div className="border-b border-gray-900/10 pb-12 ">
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Essas informações serão exibidas publicamente, portanto, tenha
                  cuidado com o que você compartilha.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="description"
                      className="block text-sm leading-6 text-gray-600"
                    >
                      Título
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                        <input
                          type="text"
                          id="description"
                          {...register("description")}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Programação II"
                          required
                        />
                        {errors.description && (
                          <p className="text-red-600 text-xs">
                            {errors.description.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-full py-2">
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Qual é natureza do ficheiro?
                    </p>
                    <div className=" py-4">
                      <div className="sm:max-w-md">
                        {plans.map((plan, index) => (
                          <Fragment key={index}>
                            <div className="form-control">
                              <label className="label cursor-pointer">
                                <span className="label-text">
                                  {plan.discriminator}
                                </span>
                                <input
                                  type="radio"
                                  className="radio"
                                  value={plan.value}
                                  {...register("discriminator")}
                                />
                              </label>
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </div>

                    <div className="col-span-full sm:max-w-md py-2">
                      <label
                        htmlFor="cover-photo"
                        className="block text-sm leading-6 text-gray-600"
                      >
                        Anexar Ficheiro
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <div className="flex">
                            {files.length == 0 ? (
                              <PhotoIcon
                                className=" mx-auto h-12 w-12 text-gray-300"
                                aria-hidden="true"
                              />
                            ) : (
                              files.map((file: IFile, index: any) => (
                                <div key={index} className="flex justify-end">
                                  <XCircleIcon
                                    className=" stroke-error h-5 w-5 fill-black absolute hover:cursor-grab"
                                    onClick={() => {
                                      handleRemoveImage(index);
                                    }}
                                  />
                                  {file.mimetype.includes("image") ? (
                                    <img
                                      src={file.url}
                                      alt="lorem"
                                      className="self-center aspect-[16/9] object-cover object-center h-20 w-20 rounded-sm"
                                    />
                                  ) : file.mimetype.includes("video") ? (
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
                              ))
                            )}
                          </div>
                          <div className="mt-4 flex text-sm leading-6 text-gray-600 w-full justify-center">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 hover:text-blue-500"
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
                          <p className="text-xs leading-5 text-gray-600">
                            PNG, PDF, JPEG, DOCX
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-full sm:max-w-md py-2">
                      <label
                        htmlFor="category"
                        className="block text-sm leading-6 text-gray-600 mb-2 "
                      >
                        Categoria
                      </label>
                      {status === "success" && (
                        <Controller
                          name="categoryId"
                          control={control}
                          render={({ field: { onChange } }) => (
                            <Select
                              options={data.mappedCategories}
                              onChange={(e) => {
                                onChange(e);
                              }}
                            />
                          )}
                        />
                      )}
                      {errors.categoryId?.message && (
                        <p className="text-red-600 text-xs">
                          {errors.categoryId?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 sm:max-w-lg w-full rounded-lg">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
          >
            Criar
          </button>
        </div>
      </form>
    </div>
  );
}
