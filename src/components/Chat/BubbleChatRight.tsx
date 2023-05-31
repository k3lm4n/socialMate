import dayjs from "dayjs";

type BubbleChatRightProps = {
  content: string;
  createdAt?: Date;
  senderId: string;
};
type Props = { props: BubbleChatRightProps,key:any };

function BubbleChatRight(props: Props, key:any) {
  return (
    <div className="chat chat-end" key={key}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Chat"
            width={40}
            height={40}
            src="https://api.multiavatar.com/Starcrasher.svg"
          />
        </div>
      </div>
      <div className="chat-header">
        {props.props.senderId}
        <time className="text-xs opacity-50">
          {dayjs(props.props.createdAt).format("DD/MM HH:mm")}
        </time>
      </div>
      <div className="chat-bubble">{props.props.content}</div>
      <div className="chat-footer opacity-50"></div>
    </div>
  );
}

export default BubbleChatRight;
