import { useState } from "react";
import Folder from "./components/Folder";
import explorer from "./data/folderData";
import './App.css';
import useTreeTraversal from "./hooks/use-tree-traversal";

function App() {
  const [ explorerData, setExplorerData ] = useState(explorer);
  const { insertNode, deleteNode } = useTreeTraversal();

  console.log('explorer -> ', explorerData);

  const handleAddNode = (name, isFolder, parentId) => {
    const newTree = insertNode(explorerData, name, isFolder, parentId);

    setExplorerData(newTree);
  }

  const handleDeleteNode = (id) => {
    deleteNode(explorerData, id);
    const newTree = deleteNode(explorerData, id);

    setExplorerData(newTree);
  }

  return (
    <div className="mainContainer">
      <Folder
        explorerData={explorerData} 
        handleAddNode={handleAddNode} 
        handleDeleteNode={handleDeleteNode} 
      />
    </div>
  );
}

export default App;
