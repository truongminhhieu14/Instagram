import Image from "next/image";

type Props = {
  className?: string;
};
export default function UserMessage({ className }: Props) {
  return (
    <div className={className}>
      <div className="flex items-center">
        <Image
          src="/at.jpg"
          alt="avatar"
          width={40}
          height={40}
          className="w-12 h-12 rounded-full mr-4 object-fill"
        />
        <p className="text-sm font-semibold">1longg</p>
      </div>
      <div className="w-2 h-2 rounded-full bg-red-700 text-white text-center text-xs"></div>
    </div>
  );
}
