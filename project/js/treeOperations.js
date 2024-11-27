// Định nghĩa class TreeManager để quản lý danh sách cây và các thao tác liên quan.
class TreeManager {
  constructor(data = []) {
    this.trees = data; // Lưu danh sách cây.
    this.search = new TreeSearch(data); // Tạo đối tượng TreeSearch để hỗ trợ tìm kiếm.
    this.charts = new ChartManager(); // Tạo đối tượng ChartManager để quản lý biểu đồ.
  }

  // Phương thức hiển thị danh sách cây ra giao diện.
  renderTreeList(data = this.trees) {
    const tbody = document.getElementById("treeList"); // Lấy phần tử HTML chứa danh sách cây.
    tbody.innerHTML = ""; // Xóa nội dung hiện tại trong danh sách.

    // Duyệt qua danh sách cây để tạo các hàng (row) trong bảng.
    data.forEach((tree) => {
      const row = document.createElement("tr"); // Tạo một hàng mới.
      row.innerHTML = `
                <td>${tree.code}</td> <!-- Mã cây -->
                <td>${tree.name}</td> <!-- Tên cây -->
                <td>${tree.type}</td> <!-- Loại cây -->
                <td>${Utils.formatDate(
                  tree.plantDate
                )}</td> <!-- Ngày trồng cây (định dạng lại bằng hàm Utils.formatDate) -->
                <td>
                    <span class="badge ${
                      tree.status === "Tốt" ? "bg-success" : "bg-warning"
                    }"> <!-- Gắn nhãn trạng thái cây -->
                        ${tree.status}
                    </span>
                </td>
                <td>
                    <!-- Nút sửa cây -->
                    <button class="btn btn-sm btn-warning me-1" onclick="treeManager.editTree('${
                      tree.code
                    }')">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <!-- Nút xóa cây -->
                    <button class="btn btn-sm btn-danger" onclick="treeManager.deleteTree('${
                      tree.code
                    }')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
      tbody.appendChild(row); // Thêm hàng vào danh sách.
    });

    // Cập nhật phần tóm tắt trạng thái cây.
    this.updateStatusSummary(data);
  }

  // Phương thức cập nhật tóm tắt trạng thái cây.
  updateStatusSummary(data) {
    const summaryData = CONFIG.TREE_TYPES.map((type) => ({
      type, // Loại cây.
      total: data.filter((tree) => tree.type === type).length, // Tổng số cây của loại đó.
      good: data.filter((tree) => tree.type === type && tree.status === "Tốt")
        .length, // Số cây có trạng thái "Tốt".
      needCare: data.filter(
        (tree) => tree.type === type && tree.status === "Cần Chăm Sóc"
      ).length, // Số cây cần chăm sóc.
    }));

    const statusSummary = document.getElementById("statusSummary"); // Lấy phần tử HTML để hiển thị tóm tắt.
    if (statusSummary) {
      statusSummary.innerHTML = `
                <div class="status-summary-grid">
                    ${summaryData
                      .map(
                        (item) => `
                        <div class="status-summary-card">
                            <h4>${item.type}</h4> <!-- Tên loại cây -->
                            <div class="status-details">
                                <!-- Số cây "Tốt" -->
                                <div class="status-item good">
                                    <span class="label">Tốt:</span>
                                    <span class="value">${item.good}</span>
                                </div>
                                <!-- Số cây cần chăm sóc -->
                                <div class="status-item warning">
                                    <span class="label">Cần chăm sóc:</span>
                                    <span class="value">${item.needCare}</span>
                                </div>
                                <!-- Tổng số cây -->
                                <div class="status-item total">
                                    <span class="label">Tổng:</span>
                                    <span class="value">${item.total}</span>
                                </div>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            `;
    }
  }

  // Phương thức thêm hoặc cập nhật cây.
  addTree(formData) {
    // Kiểm tra dữ liệu biểu mẫu có hợp lệ hay không.
    if (!Utils.validateForm(formData)) {
      Utils.showToast("Vui lòng điền đầy đủ thông tin", "error");
      return false;
    }

    // Tìm xem cây có tồn tại trong danh sách không (dựa trên mã cây).
    const existingTree = this.trees.find((tree) => tree.code === formData.code);
    if (existingTree) {
      Object.assign(existingTree, formData); // Nếu tồn tại, cập nhật thông tin cây.
      Utils.showToast("Cập nhật cây thành công");
    } else {
      this.trees.push(formData); // Nếu không tồn tại, thêm cây mới.
      Utils.showToast("Thêm cây mới thành công");
    }

    this.updateUI(); // Cập nhật giao diện.
    return true;
  }

  // Phương thức xóa cây khỏi danh sách.
  deleteTree(code) {
    if (confirm("Bạn có chắc muốn xóa cây này?")) {
      // Hiển thị thông báo xác nhận xóa.
      this.trees = this.trees.filter((tree) => tree.code !== code); // Loại bỏ cây khỏi danh sách.
      this.updateUI(); // Cập nhật giao diện.
      Utils.showToast("Xóa cây thành công");
    }
  }

  // Phương thức chỉnh sửa thông tin cây (hiển thị dữ liệu lên biểu mẫu).
  editTree(code) {
    const tree = this.trees.find((t) => t.code === code); // Tìm cây cần chỉnh sửa.
    if (tree) {
      // Gán thông tin cây vào các ô nhập liệu.
      document.getElementById("treeCode").value = tree.code;
      document.getElementById("treeName").value = tree.name;
      document.getElementById("treeType").value = tree.type;
      document.getElementById("plantDate").value = tree.plantDate;
      document.getElementById("treeStatus").value = tree.status;

      showSection("add"); // Chuyển sang phần giao diện thêm/sửa cây.
    }
  }

  // Phương thức cập nhật toàn bộ giao diện.
  updateUI() {
    this.renderTreeList(); // Hiển thị danh sách cây.
    this.updateDashboard(); // Cập nhật thông tin tóm tắt.
    this.charts.updateAllCharts(this.trees); // Cập nhật biểu đồ.
  }

  // Phương thức cập nhật bảng tóm tắt cây trên dashboard.
  updateDashboard() {
    document.getElementById("totalTrees").textContent = this.trees.length; // Tổng số cây.
    document.getElementById("needCare").textContent = this.trees.filter(
      (tree) => tree.status === "Cần Chăm Sóc"
    ).length; // Số cây cần chăm sóc.
    document.getElementById("newTrees").textContent = this.trees.filter(
      (tree) => {
        const plantDate = new Date(tree.plantDate); // Ngày trồng cây.
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Ngày của 1 tháng trước.
        return plantDate >= oneMonthAgo; // Kiểm tra cây có được trồng trong vòng 1 tháng không.
      }
    ).length; // Số cây mới được trồng.
  }

  // Phương thức thực hiện tìm kiếm.
  performSearch() {
    const searchValue = document.getElementById("searchInput").value; // Lấy giá trị tìm kiếm.
    const searchType = document.getElementById("searchType").value; // Lấy loại tìm kiếm (thuộc tính).
    const results = this.search.search(searchValue, searchType); // Thực hiện tìm kiếm.
    this.renderTreeList(results); // Hiển thị kết quả tìm kiếm.
  }
}

/*
Tóm tắt chức năng chính:
1. Quản lý danh sách cây: Hiển thị, thêm, sửa, xóa.
2. Tìm kiếm: Dựa trên giá trị và thuộc tính (loại cây, tên, v.v.).
3. Tóm tắt trạng thái cây: Hiển thị số lượng cây tốt, cần chăm sóc, và tổng số cây theo từng loại.
4. Cập nhật giao diện: Đồng bộ hóa danh sách cây, biểu đồ và thông tin tóm tắt.
*/
