import { useEffect, useRef, useState } from "react";
import folder from "../assets/images/folder.png";

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
      console.log("Single click detected!");
    }
  };

  // Handle double click
  const handleDoubleClick = () => {
    if (!isDragging) {
      console.log("Double click detected!");
    }
  };

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
      className="w-32 h-32 flex justify-center items-center flex-col"
      onClick={handleSingleClick}
      onDoubleClick={handleDoubleClick}
    >
      <img src={folder} alt="Folder" />
      <p>Folder</p>
    </div>
  );
};

export default Folder;
