import { useQuery } from "react-query";
import { CommentEndPoints } from "../../../api/api";
import { MiniLoading } from "../../Loading";

interface Props {
  id: string;
}

export default function CommentBox(props: Props) {
  const comments = useQuery("comments", async () => {
    if (props.id === "") {
      return;
    }
    const data = await CommentEndPoints.getComments(props.id);
    return data.data;
  });

  return (
    <div className="h-[40rem] flex flex-col px-4">
      <h1 className="text-gray-600 text-2xl font-bold pb-4">Comentários</h1>
      {comments.isLoading ? (
        <MiniLoading />
      ) : comments.data.comments.length === 0 ? (
        <div className="px-4">
          <p className="text-gray-500">Sem comentários</p>
        </div>
      ) : (
        <div className="px-4">
          {comments.data.comments.map(
            (comment: {
              id: string;
              text: string;
              author: {
                id: string;
                name: string;
                lastname: string;
              };
              createdAt: string;
            }) => (
              <div className="w-full pb-2" key={comment.id}>
                <h3 className="font-semi-bold text-gray-800">
                  {comment.author.name + " " + comment.author.lastname}
                </h3>
                <p className="text-gray-800 pl-4">
                  <span> </span>
                  {comment.text}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
