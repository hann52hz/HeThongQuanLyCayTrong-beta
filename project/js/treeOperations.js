// Tree operations
class TreeManager {
  constructor(data = []) {
    this.trees = data;
    this.search = new TreeSearch(data);
    this.charts = new ChartManager();
  }

  renderTreeList(data = this.trees) {
    const tbody = document.getElementById("treeList");
    tbody.innerHTML = "";

    data.forEach((tree) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${tree.code}</td>
                <td>${tree.name}</td>
                <td>${tree.type}</td>
                <td>${Utils.formatDate(tree.plantDate)}</td>
                <td>
                    <span class="badge ${
                      tree.status === "Tốt" ? "bg-success" : "bg-warning"
                    }">
                        ${tree.status}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="treeManager.editTree('${
                      tree.code
                    }')">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="treeManager.deleteTree('${
                      tree.code
                    }')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
      tbody.appendChild(row);
    });

    // Update status summary
    this.updateStatusSummary(data);
  }

  updateStatusSummary(data) {
    const summaryData = CONFIG.TREE_TYPES.map((type) => ({
      type,
      total: data.filter((tree) => tree.type === type).length,
      good: data.filter((tree) => tree.type === type && tree.status === "Tốt")
        .length,
      needCare: data.filter(
        (tree) => tree.type === type && tree.status === "Cần Chăm Sóc"
      ).length,
    }));

    const statusSummary = document.getElementById("statusSummary");
    if (statusSummary) {
      statusSummary.innerHTML = `
                <div class="status-summary-grid">
                    ${summaryData
                      .map(
                        (item) => `
                        <div class="status-summary-card">
                            <h4>${item.type}</h4>
                            <div class="status-details">
                                <div class="status-item good">
                                    <span class="label">Tốt:</span>
                                    <span class="value">${item.good}</span>
                                </div>
                                <div class="status-item warning">
                                    <span class="label">Cần chăm sóc:</span>
                                    <span class="value">${item.needCare}</span>
                                </div>
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

  addTree(formData) {
    if (!Utils.validateForm(formData)) {
      Utils.showToast("Vui lòng điền đầy đủ thông tin", "error");
      return false;
    }

    const existingTree = this.trees.find((tree) => tree.code === formData.code);
    if (existingTree) {
      Object.assign(existingTree, formData);
      Utils.showToast("Cập nhật cây thành công");
    } else {
      this.trees.push(formData);
      Utils.showToast("Thêm cây mới thành công");
    }

    this.updateUI();
    return true;
  }

  deleteTree(code) {
    if (confirm("Bạn có chắc muốn xóa cây này?")) {
      this.trees = this.trees.filter((tree) => tree.code !== code);
      this.updateUI();
      Utils.showToast("Xóa cây thành công");
    }
  }

  editTree(code) {
    const tree = this.trees.find((t) => t.code === code);
    if (tree) {
      document.getElementById("treeCode").value = tree.code;
      document.getElementById("treeName").value = tree.name;
      document.getElementById("treeType").value = tree.type;
      document.getElementById("plantDate").value = tree.plantDate;
      document.getElementById("treeStatus").value = tree.status;

      showSection("add");
    }
  }

  updateUI() {
    this.renderTreeList();
    this.updateDashboard();
    this.charts.updateAllCharts(this.trees);
  }

  updateDashboard() {
    document.getElementById("totalTrees").textContent = this.trees.length;
    document.getElementById("needCare").textContent = this.trees.filter(
      (tree) => tree.status === "Cần Chăm Sóc"
    ).length;
    document.getElementById("newTrees").textContent = this.trees.filter(
      (tree) => {
        const plantDate = new Date(tree.plantDate);
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return plantDate >= oneMonthAgo;
      }
    ).length;
  }

  performSearch() {
    const searchValue = document.getElementById("searchInput").value;
    const searchType = document.getElementById("searchType").value;
    const results = this.search.search(searchValue, searchType);
    this.renderTreeList(results);
  }
}
