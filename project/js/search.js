// Định nghĩa một class TreeNode để biểu diễn một node trong cây nhị phân.
class TreeNode {
  constructor(data) {
    this.data = data; // Lưu trữ dữ liệu của node.
    this.left = null; // Con trái của node, mặc định là null.
    this.right = null; // Con phải của node, mặc định là null.
  }
}

// Định nghĩa class BinarySearchTree để tạo và thao tác với cây nhị phân tìm kiếm.
class BinarySearchTree {
  constructor() {
    this.root = null; // Gốc của cây, ban đầu là null.
  }

  // Phương thức thêm dữ liệu vào cây.
  insert(data, property) {
    const newNode = new TreeNode(data); // Tạo một node mới với dữ liệu.
    if (this.root === null) {
      // Nếu cây chưa có node nào (root là null).
      this.root = newNode; // Gán node mới làm gốc của cây.
    } else {
      // Nếu cây đã có node gốc, gọi phương thức insertNode để thêm node mới vào cây.
      this.insertNode(this.root, newNode, property);
    }
  }

  // Phương thức đệ quy để thêm một node mới vào đúng vị trí trong cây.
  insertNode(node, newNode, property) {
    // Nếu giá trị cần thêm nhỏ hơn giá trị tại node hiện tại.
    if (newNode.data[property] < node.data[property]) {
      if (node.left === null) {
        // Nếu không có con trái.
        node.left = newNode; // Gán node mới làm con trái.
      } else {
        // Gọi đệ quy để kiểm tra tiếp ở cây con trái.
        this.insertNode(node.left, newNode, property);
      }
    } else {
      // Nếu giá trị cần thêm lớn hơn hoặc bằng giá trị tại node hiện tại.
      if (node.right === null) {
        // Nếu không có con phải.
        node.right = newNode; // Gán node mới làm con phải.
      } else {
        // Gọi đệ quy để kiểm tra tiếp ở cây con phải.
        this.insertNode(node.right, newNode, property);
      }
    }
  }

  // Phương thức tìm kiếm một node trong cây.
  search(node, key, property) {
    if (node === null) {
      // Nếu không tìm thấy (đến lá cây).
      return null; // Trả về null.
    }
    if (key === node.data[property]) {
      // Nếu tìm thấy giá trị khớp.
      return node.data; // Trả về dữ liệu của node.
    }
    if (key < node.data[property]) {
      // Nếu giá trị cần tìm nhỏ hơn giá trị tại node hiện tại.
      return this.search(node.left, key, property); // Gọi đệ quy để tìm tiếp ở cây con trái.
    } else {
      return this.search(node.right, key, property); // Gọi đệ quy để tìm tiếp ở cây con phải.
    }
  }
}

// Class TreeSearch giúp quản lý dữ liệu và sử dụng cây nhị phân tìm kiếm.
class TreeSearch {
  constructor(data) {
    this.data = data; // Lưu trữ danh sách dữ liệu ban đầu.
    this.bst = new BinarySearchTree(); // Tạo một cây nhị phân tìm kiếm mới.
  }

  // Phương thức xây dựng cây nhị phân dựa trên thuộc tính cụ thể.
  buildTree(property) {
    // Duyệt qua từng phần tử trong danh sách và thêm vào cây.
    this.data.forEach((item) => this.bst.insert(item, property));
  }

  // Phương thức tìm kiếm theo giá trị và loại tìm kiếm (thuộc tính).
  search(searchValue, searchType) {
    if (!searchValue) return this.data; // Nếu không có giá trị tìm kiếm, trả về toàn bộ dữ liệu.

    this.buildTree(searchType); // Xây dựng cây nhị phân dựa trên thuộc tính tìm kiếm.
    const result = this.bst.search(this.bst.root, searchValue, searchType); // Tìm kiếm trong cây.

    if (result) {
      return [result]; // Nếu tìm thấy trong cây, trả về kết quả dưới dạng mảng.
    } else {
      // Nếu không tìm thấy, lọc danh sách ban đầu dựa trên chuỗi con khớp (không phân biệt hoa thường).
      return this.data.filter((tree) =>
        tree[searchType].toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  }
}

/*
Tóm tắt:
1. TreeNode: Biểu diễn một phần tử trong cây.
2. BinarySearchTree: Tạo cây nhị phân tìm kiếm, cung cấp các thao tác như thêm và tìm kiếm node.
3. TreeSearch: Kết hợp dữ liệu ban đầu với cây nhị phân để thực hiện tìm kiếm nhanh chóng.
*/
