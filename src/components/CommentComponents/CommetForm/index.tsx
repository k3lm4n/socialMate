import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "react-query";
import {
  CommentSchemaType,
  commentSchema,
} from "../../../utils/validator/comment";
import { CommentEndPoints } from "../../../api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  postId: string;
}

export default function CommentForm(props: Props) {
  const queryClient = useQueryClient();

  const comments = useMutation(
    (data: CommentSchemaType) => CommentEndPoints.createComment(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comments");
      },
    }
  );

  const { register, handleSubmit, watch, setValue } =
    useForm<CommentSchemaType>({
      resolver: zodResolver(commentSchema),
    });

  const onSubmit: SubmitHandler<CommentSchemaType> = async (req) => {
    await comments.mutateAsync(req);
    setValue("text", "");
  };

  register("postId", { value: props.postId });

  console.log(watch("text"), watch("postId"));

  return (
    <div className="py-4 px-4">
      <form
        className="flex flex-row w-full pt-2 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          className="hidden"
          {...register("postId")}
          value={props.postId}
        />

        <input
          type="text"
          {...register("text")}
          className="input input-bordered w-full "
        />

        <button type="submit" className="btn btn-xl ml-2">
          <PaperAirplaneIcon className="h-12 w-7" />
        </button>
      </form>
    </div>
  );
}
