import ActivityIcon from "@/Icon/activityIcon";
import ExclamIcon from "@/Icon/exclamIcon";
import LogoutIcon from "@/Icon/logoutIcon";
import SaveIcon from "@/Icon/saveIcon";
import SettingIcon from "@/Icon/settingIcon";
import SunIcon from "@/Icon/sunIcon";
import { removeAllStorage, removeUser } from "@/service/storage.service";
type Props = {
  className?: string;
};
export default function PopoverMore({ className }: Props) {
  const onClick = () => {
    removeAllStorage()
    window.location.href = "/login"
  }
  return (
    <div className="absolute z-100 w-48 bg-white rounded-md mt-2 top-[calc(-300px_-_100%)] border rounded-lg p-2">
      <div className="p-2 mb-2 w-full flex items-center hover:bg-slate-100 border-transparent rounded-md cursor-pointer">
        <SettingIcon className="w-6 h-6 mr-2" />
        <p className="text-sm">Settings</p>
      </div>

      <div className="p-2 mb-2 w-full flex items-center hover:bg-slate-100 border-transparent rounded-md cursor-pointer">
        <ActivityIcon className="w-6 h-6 mr-2" />
        <p className="text-sm">Your Activity</p>
      </div>

      <div className="p-2 mb-2 w-full flex items-center hover:bg-slate-100 border-transparent rounded-md cursor-pointer">
        <SaveIcon className="w-6 h-6 mr-2" />
        <p className="text-sm">Save</p>
      </div>

      <div className="p-2 mb-2 w-full flex items-center hover:bg-slate-100 border-transparent rounded-md cursor-pointer">
        <SunIcon className="w-6 h-6 mr-2" />
        <p className="text-sm">Switch appearance</p>
      </div>

      <div className="p-2 mb-2 w-full flex items-center hover:bg-slate-100 border-transparent rounded-md cursor-pointer">
        <ExclamIcon className="w-6 h-6 mr-2" />
        <p className="text-sm">Report a problem</p>
      </div>

      <button onClick={onClick} className="p-2  w-full flex items-center hover:bg-slate-100 border-transparent rounded-md cursor-pointer">
        <LogoutIcon className="w-6 h-6 mr-2" />
        <p className="text-sm">Logout</p>
      </button>
    </div>
  );
}
