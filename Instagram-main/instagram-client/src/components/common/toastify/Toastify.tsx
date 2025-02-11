import { useMemo } from "react";

import style from "./toastify.module.scss";
import SystemInfo from "@/Icon/systemInfo";
import SystemCheckmark from "@/Icon/systemCheckMark";
import SystemCloseCircle from "@/Icon/systemCloseCircle";
import SystemWarning from "@/Icon/systemWarning";
import { toast } from "react-toastify";

function Toastify({ type, msg }: { type: string; msg: string }) {
  const iconName = useMemo(() => {
    switch (type) {
      case "info":
        return (
          <SystemInfo
            style={{
              color: "#4B9C95",
            }}
          />
        );
      case "success":
        return (
          <SystemCheckmark
            style={{
              color: "#64ba2a",
            }}
          />
        );
      case "error":
        return (
          <SystemCloseCircle
            style={{
              color: "#ff4a32",
            }}
          />
        );
      case "warning":
      case "warn":
        return (
          <SystemWarning
            style={{
              color: "#edca1e",
            }}
          />
        );

      default:
        break;
    }
  }, [type]);

  return (
    <div className={style["toastify-container"]}>
      {iconName}
      <p className={style["toastify-content"]}>{msg} </p>
    </div>
  );
}

type ToastifyProps = {
  type: "info" | "success" | "error" | "warning" | "warn";
  msg: string;
  onClose?: () => void;
  msgBtn?: string;
  onClick?: () => void;
  extraMsg?: string;
  autoClose?: number;
};
export function toastify({
  type,
  msg,
  onClose,
  autoClose = 1500,
}: ToastifyProps) {
  toast[type](<Toastify type={type} msg={msg} />, {
    position: "top-center",
    autoClose: autoClose,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    onClose,
    icon: false,
    closeButton: () => (
      <div
        style={{
          width: "24px",
          height: "24px",
        }}
      >
        <SystemCloseCircle />
      </div>
    ),
  });
}
