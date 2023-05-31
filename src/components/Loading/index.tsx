import { Hypnosis } from "react-cssfx-loading";

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-20 bg-black/80 flex justify-center items-center">
        <Hypnosis height={120} width={120} color="#00cede" />
    </div>
  );
}
