import { useEffect, useRef, useState } from "react";
import folder from "../assets/images/folder.png";
import folderBlue from "../assets/images/folderBlue.png";

interface Position {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

interface FolderProps {
  position: Position;
}

const Folder: React.FC<FolderProps> = ({ position }) => {
  const draggableRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSingleClicked, setIsSingleClicked] = useState(false);

  const dragElement = (element: HTMLElement) => {
    let initialX = 0,
      initialY = 0;
    let posX = 0,
      posY = 0;
    let isMoved = false;

    const handleMouseDown = (event: MouseEvent) => {
      event.preventDefault();

      initialX = event.clientX;
      initialY = event.clientY;

      document.onmousemove = handleMouseMove;
      document.onmouseup = handleMouseUp;

      isMoved = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      const deltaX = event.clientX - initialX;
      const deltaY = event.clientY - initialY;

      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        isMoved = true; // Flag for detecting a drag
        setIsDragging(true);

        posX = deltaX;
        posY = deltaY;

        element.style.transform = `translate(${posX}px, ${posY}px)`;
      }
    };

    const handleMouseUp = () => {
      if (isMoved) {
        alert("You can't move this item");
        resetPosition();
      }

      document.onmousemove = null;
      document.onmouseup = null;

      setIsDragging(false);
    };

    element.onmousedown = handleMouseDown;
  };

  const resetPosition = () => {
    if (draggableRef.current) {
      draggableRef.current.style.transform = `translate(0, 0)`;
    }
  };

  useEffect(() => {
    if (draggableRef.current) {
      dragElement(draggableRef.current);
    }
  }, []);

  // Handle single click
  const handleSingleClick = () => {
    if (!isDragging) {
      setIsSingleClicked(true);
      console.log("sindle !");
    }
  };

  // Handle double click
  const handleDoubleClick = () => {
    if (!isDragging) {
      console.log("Double click detected!");
    }
  };

  // Detect click outside of the folder to reset `isSingleClicked`
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        draggableRef.current &&
        !draggableRef.current.contains(event.target as Node)
      ) {
        setIsSingleClicked(false);
        console.log("outside click !");
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Generate dynamic style based on the `position` prop
  const getPositionStyle = () => {
    const positionStyle: React.CSSProperties = {
      position: "absolute",
      ...(position.top !== undefined ? { top: `${position.top}px` } : {}),
      ...(position.bottom !== undefined
        ? { bottom: `${position.bottom}px` }
        : {}),
      ...(position.left !== undefined ? { left: `${position.left}px` } : {}),
      ...(position.right !== undefined ? { right: `${position.right}px` } : {}),
    };
    return positionStyle;
  };

  return (
    <div
      ref={draggableRef}
      style={getPositionStyle()}
      className="w-[70px] h-[70px] flex gap-2 relative justify-center items-center flex-col"
      onClick={handleSingleClick}
      onDoubleClick={handleDoubleClick}
    >
      {isSingleClicked ? (
        <img src={folderBlue} alt="Folder" />
      ) : (
        <img src={folder} alt="Folder" />
      )}

      {isSingleClicked ? (
        <div className=" bg-old_windows_blue absolute top-[75px] p-2 flex items-center justify-center w-full h-5 border-white border-opacity-80 border-dashed border-[1px]">
          <p className="text-white placeholder-opacity-80">Folder</p>
        </div>
      ) : (
        <p className="text-black absolute top-[75px]">Folder</p>
      )}
    </div>
  );
};

export default Folder;
