"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  className?: string;
  children?: React.ReactNode;
  trigger?: React.ReactNode;
};

export default function Popover({ className, children, trigger }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => {
    setIsVisible(!isVisible);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative w-full" ref={popoverRef}>
      <div className="w-full" onClick={togglePopover}>
        {trigger}
      </div>
      {isVisible && children}
    </div>
  );
}
