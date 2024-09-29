import { FC, useEffect, useRef } from "react";

interface iDragNdropProps {
  children: React.ReactNode;
}

// Variable to track the highest z-index
let highestZIndex = 1;

const DragNDropWrapper: FC<iDragNdropProps> = ({ children }) => {
  const draggableRef = useRef<HTMLDivElement | null>(null);

  const dragElement = (element: HTMLElement) => {
    let posX = 0,
      posY = 0,
      initialX = 0,
      initialY = 0;

    element.onmousedown = (event) => {
      event.preventDefault();

      // Bring the clicked element to the front by increasing its z-index
      highestZIndex++;
      element.style.zIndex = `${highestZIndex}`;

      initialX = event.clientX;
      initialY = event.clientY;

      document.onmousemove = moveElement;
      document.onmouseup = stopDragging;
    };

    const moveElement = (event: MouseEvent) => {
      event.preventDefault();

      posX = initialX - event.clientX;
      posY = initialY - event.clientY;
      initialX = event.clientX;
      initialY = event.clientY;

      element.style.top = `${element.offsetTop - posY}px`;
      element.style.left = `${element.offsetLeft - posX}px`;
    };

    const stopDragging = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  useEffect(() => {
    if (draggableRef.current) {
      dragElement(draggableRef.current);
    }
  }, []);

  return (
    <div
      ref={draggableRef}
      className="absolute cursor-grab"
      style={{ zIndex: 1 }}
    >
      {children}
    </div>
  );
};

export default DragNDropWrapper;
