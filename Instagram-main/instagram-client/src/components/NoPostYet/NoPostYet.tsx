import CameraIcon from "@/Icon/cameraIcon";
type Props = {
  className: string;
};

export default function NoPostYet({ className }: Props) {
  return (
    <div className={className}>
      <CameraIcon className="w-16 h-16" />
      <p className="text-3xl font-bold mt-4">No Post Yet</p>
    </div>
  );
}
