import { useState } from "react";
import AgoraUIKit from "agora-react-uikit";
import { useQuery } from "react-query";
import { UserEndPoints } from "../../../api/api";
import Loading from "../../../components/Loading";
import { redirect, useParams, useNavigate } from "react-router-dom";

export default function VideoChat() {
  const { chatId } = useParams<{ chatId: string }>();
  const [videoCall, setVideoCall] = useState(true);

  const { data } = useQuery("ChatList", async () => {
    const { data } = await UserEndPoints.getAccessToken(chatId!, "0");
    return data;
  });

  console.log(data);

  const rtcProps = {
    appId: import.meta.env.VITE_APP_ID_AGORA,
    channel: chatId!,
    token: data,
  };

  const navigate = useNavigate();

  const callbacks = {
    EndCall: () => {
      setVideoCall(false);
      // navigate("/feed/chats");
    },
  };

  return data !== undefined ? (
    videoCall ? (
      <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
        <AgoraUIKit
          rtcProps={rtcProps}
          callbacks={callbacks}
          styleProps={{
            BtnTemplateStyles: {
              backgroundColor: "#fff",
              borderRadius: 23,
              width: 40,
              height: 40,
              display: "flex",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
            },
            localBtnContainer: {
              backgroundColor: "#59cbff",
            },
            customIcon: {
              callEnd: "https://img.icons8.com/ios/25/000000/end-call--v1.png",
              mic: "https://img.icons8.com/ios/25/000000/microphone.png",
              micOff: "https://img.icons8.com/ios/25/ff0000/microphone.png",
              videocam: "https://img.icons8.com/ios/25/000000/video-call.png",
              videocamOff:
                "https://img.icons8.com/ios/25/ff0000/video-call.png",
            },
            gridVideoContainer: {
              flex: 12,
              backgroundColor: "#fff",
              flexDirection: "row",
            },
          }}
        />
      </div>
    ) : (
      <div className="flex justify-center items-center">
        <h3 className="text-black text-xs " onClick={() => setVideoCall(true)}>
          Join
        </h3>
      </div>
    )
  ) : (
    <Loading />
  );
}
