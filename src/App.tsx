import DragNDropWrapper from "./utils/drag-n-drop-wrapper";
import OldWindowsWrapper from "./ui/old_windows-wrapper";
import { profilePictures } from "./data/profilePictures";
import Folder from "./ui/folder";

function App() {
  return (
    <>
      <div className="flex relative justify-start bg-old_windows_green flex-col w-full overflow-x-hidden  h-screen p-2 font-primary">
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
        <Folder
          position={{
            top: 50,
            right: 50,
          }}
        />
      </div>
    </>
  );
}

export default App;
