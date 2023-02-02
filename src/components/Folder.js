import React, { useState } from 'react';
import './Folder.css';

const Folder = ({ explorerData, handleAddNode, handleDeleteNode }) => {
  const [expand, setExpand] = useState(true);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleAddFolder = (e) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({ visible:true, isFolder: true });
  }
  
  const handleAddFile = (e) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({ visible:true, isFolder: false });
  }

  const handleDelete = (e) => {
    e.stopPropagation();

    handleDeleteNode(explorerData.id);
  }

  const createFolder = (e) => {
    if(e.target.value && e.keyCode === 13) {
      console.log('add this folder');
      // close the input field
      setShowInput({ ...showInput, visible: false });

      handleAddNode(e.target.value, showInput.isFolder, explorerData.id);
    }
  }

  if(!explorerData.id) {
    return(<></>)
  }
  else if(explorerData.isFolder) {
    return (
      <div className='rootDir'>
        <div className={`folderContainer`} onClick={() => setExpand(!expand)}>
            <span>📂 {explorerData.name}</span>
            <div className='buttonsContainer'>
              <button onClick={handleDelete}>❌</button>
              <button onClick={handleAddFolder}>Folder +</button>
              <button onClick={handleAddFile}>File +</button>
            </div>
        </div>
        <div className={`children ${expand ? '' : 'hide'}`}>
          {showInput.visible && 
          <div className='inputContainer'>
            {showInput.isFolder ? '📂 ' : '📄 '}
            <input 
              type={"text"} 
              autoFocus
              onBlur={() => setShowInput({ ...showInput, visible: false})}
              onKeyDown={createFolder}
            />
          </div>}
          {explorerData.items.map((data) => <Folder explorerData={data} key={data.id} handleAddNode={handleAddNode} handleDeleteNode={handleDeleteNode} />)}
        </div> 
      </div>
    );
  }
  else {
    return(
      <div className='fileContainer'>
        <span className='fileName'>📄 {explorerData.name}</span>
        <button onClick={handleDelete}>❌</button>
      </div>
    );
  }
}

export default Folder
