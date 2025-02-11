import Image from "next/image";
import Link from "next/link";

type Props = {
  className?: string;
};
export default function UserCompact({ className }: Props) {
  return (
    <div className={className}>
      <Link href="/long" className="flex items-center">
        <Image
          src="/login/ggplay.png"
          alt="avatar"
          width={32}
          height={32}
          className="object-contain border rounded-full w-10 h-10 mr-4"
        />
        <p className="text-xs font-semibold">1longg</p>
      </Link>
      <button className="text-xs font-semibold text-blue-500">Follow</button>
    </div>
  );
}
