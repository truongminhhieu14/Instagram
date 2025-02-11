import { footerFixData } from "./footerFixData";

export default function Footer() {
  return (
    <div className="bottom-0 px-4 mx-auto pb-8 w-full bg-white">
      <div className="flex justify-center text-neutral-500 text-xs flex-wrap w-full">
        {footerFixData.map((item, index) => (
          <div key={index} className="p-2 cursor-pointer hover:underline">
            {item}
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full text-neutral-500 text-xs">
        <div className="p-2 pr-4 cursor-pointer">English</div>
        <div className="p-2">Instagram clone from @1longg</div>
      </div>
    </div>
  );
}
