import SideBarMessage from "@/components/SideBarMessage";
import { MessageProvider } from "./context";

type Props = {
  children: React.ReactNode;
};
export default function MessageLayout({ children }: Props) {
  return (
    <MessageProvider>
      <div className="w-screen h-screen flex">
        <SideBarMessage className="w-1/4 py-6 border-r border-slate-300 h-screen fixed left-0 bg-white" />
        {children}
      </div>
    </MessageProvider>
  );
}
