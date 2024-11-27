class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(data, property) {
    const newNode = new TreeNode(data);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode, property);
    }
  }

  insertNode(node, newNode, property) {
    if (newNode.data[property] < node.data[property]) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode, property);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode, property);
      }
    }
  }

  search(node, key, property) {
    if (node === null) {
      return null;
    }
    if (key === node.data[property]) {
      return node.data;
    }
    if (key < node.data[property]) {
      return this.search(node.left, key, property);
    } else {
      return this.search(node.right, key, property);
    }
  }
}

class TreeSearch {
  constructor(data) {
    this.data = data;
    this.bst = new BinarySearchTree();
  }

  buildTree(property) {
    this.data.forEach((item) => this.bst.insert(item, property));
  }

  search(searchValue, searchType) {
    if (!searchValue) return this.data;

    this.buildTree(searchType);
    const result = this.bst.search(this.bst.root, searchValue, searchType);

    if (result) {
      return [result];
    } else {
      return this.data.filter((tree) =>
        tree[searchType].toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  }
}
