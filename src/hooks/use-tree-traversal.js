const useTreeTraversal = () => {
  function insertNode(tree, name, isFolder, parentId) {
    if(tree.id == parentId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name,
        isFolder,
        items: [],
      });
      return tree;
    }

    let latestTree = [];
    latestTree = tree.items.map((item) => insertNode(item, name, isFolder, parentId));
    return {...tree, items: latestTree}
  }

  function deleteNode(tree, id) {
    if(tree.id == id) {
      // console.log('Deleting -> ', tree.id);
      delete tree.id;
      delete tree.name;
      delete tree.isFolder;
      delete tree.items;
      return tree;
    }

    let latestTest = [];
    let filteredNodes = tree.items ? tree.items.filter(item => item.id != id) : [];
    latestTest = filteredNodes?.map((item) => deleteNode(item, id));
    return {...tree, items: latestTest};
  }

  return { insertNode, deleteNode };
}

export default useTreeTraversal;