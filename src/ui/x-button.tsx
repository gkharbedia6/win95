import { FC } from "react";

interface iXButtonProps {
  onClick: () => void;
}

const XButton: FC<iXButtonProps> = ({ onClick }) => {
  return (
    <div
      className="w-5 h-5 bg-old_windows_gray old_windows-window-border  flex justify-center items-center cursor-pointer"
      onClick={() => onClick()}
    >
      <span className="text-black text-sm mt-[1px]">X</span>
    </div>
  );
};

export default XButton;
