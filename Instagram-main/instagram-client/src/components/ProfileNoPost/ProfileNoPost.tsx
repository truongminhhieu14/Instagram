import CameraIcon from "@/Icon/cameraIcon";

type Props = {
  className?: string;
};

export default function ProfileNoPost({ className = 'mb-4 flex flex-col items-center' }: Props) {
  return (
    <div className={className}>
      <CameraIcon className="w-16 h-16 mb-4" />
      <p className="text-4xl font-black">No Post Yet</p>
    </div>
  );
}
