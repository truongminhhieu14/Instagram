import Image from "next/image";

type Props = {
  className?: string;
};

export default function Comment({ className }: Props) {
  return (
    <div className={className}>
      <Image
        src="/logo.jpg"
        alt="avt"
        width={32}
        height={32}
        className="object-cover w-10 h-10 mr-4 rounded-full"
      />
      <div className="inline-block text-sm align-baseline shrink">
        <p className="font-semibold mr-2 inline-flex">1longg</p>
        <p className="inline">
          🖤❤️💛⚽🇩🇪💪 Tolle Leistung und ich bin stolz auf diese Teamleistung
          ❤️. Das habe ich vermisst! Aber jetzt schauen wir nur nach vorn💪
        </p>
        <p className="text-xs text-slate-400 my-2">4h</p>
        <div className="flex  mr-4 items-center cursor-pointer">
          <div className="h-[1px] w-6 bg-slate-400 mr-3"></div>
          <p className="text-xs text-slate-400 font-medium">View replies (6)</p>
        </div>
      </div>
    </div>
  );
}
