import DragNDropWrapper from "./utils/drag-n-drop-wrapper";
import OldWindowsWrapper from "./ui/old_windows-wrapper";
import { profilePictures } from "./data/profilePictures";

function App() {
  return (
    <>
      <div className="flex justify-start bg-old_windows_green items-start w-full h-screen p-32 font-primary">
        {profilePictures
          .slice()
          .reverse()
          .map((picture) => (
            <DragNDropWrapper key={picture.id}>
              <OldWindowsWrapper windowTitle={picture.title}>
                <div className="w-64">
                  <img src={picture.image} alt={picture.title} />
                </div>
              </OldWindowsWrapper>
            </DragNDropWrapper>
          ))}
      </div>
    </>
  );
}

export default App;
