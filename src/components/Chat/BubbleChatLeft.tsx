import dayjs from "dayjs";
import { Message } from "../../utils/types/@types";
import { useParams } from "react-router-dom";

type Props = { props: Message; key: any };

function BubbleChatLeft(props: Props, key: any) {
  const { chatId, channelId } = useParams();

  return (
    <div className="chat chat-start" key={key}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Chat"
            width={40}
            height={40}
            src={"https://ui-avatars.com/api/" + props.props.sender}
          />
        </div>
      </div>

      {channelId && chatId && (
        <div className="chat-header">{props.props.sender}</div>
      )}
      <div className="chat-bubble">{props.props.content}</div>
      <div className="chat-footer opacity-50">
        <time className="text-xs opacity-50">
          {dayjs(props.props.createdAt).format("DD/MM HH:mm")}
        </time>
      </div>
    </div>
  );
}

export default BubbleChatLeft;
