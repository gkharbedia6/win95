import { FC, useState } from "react";
import XButton from "./x-button";

interface iOldWindowsWrapperProps {
  windowTitle: string;
  children: React.ReactNode;
}

const OldWindowsWrapper: FC<iOldWindowsWrapperProps> = ({
  windowTitle,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {isVisible && (
        <div className=" flex flex-col w-full justify-start items-center gap-1 bg-old_windows_gray  old_windows-window-border  ">
          <div className="w-full h-6 bg-old_windows_blue px-1 flex justify-start items-center">
            <p className="text-white text-start flex-grow">{windowTitle}</p>
            <XButton onClick={() => setIsVisible(false)} />
          </div>
          <div className="p-4 px-12">{children}</div>
        </div>
      )}
    </>
  );
};

export default OldWindowsWrapper;
