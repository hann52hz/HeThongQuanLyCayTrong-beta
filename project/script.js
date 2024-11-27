let treeData = [];

// Tải dữ liệu ban đầu từ file `data.json`
fetch("data.json")
  .then((response) => response.json()) // Lấy dữ liệu dưới dạng JSON
  .then((data) => {
    treeData = data; // Lưu dữ liệu vào biến treeData
    updateDashboard(); // Cập nhật bảng điều khiển
    renderTreeList(); // Hiển thị danh sách cây
  });

// Cập nhật thống kê bảng điều khiển
function updateDashboard() {
  // Hiển thị tổng số cây
  document.getElementById("totalTrees").textContent = treeData.length;

  // Hiển thị số cây cần chăm sóc
  document.getElementById("needCare").textContent = treeData.filter(
    (tree) => tree.status === "Cần Chăm Sóc"
  ).length;

  // Hiển thị số cây mới trồng trong tháng qua
  document.getElementById("newTrees").textContent = treeData.filter((tree) => {
    const plantDate = new Date(tree.plantDate);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return plantDate >= oneMonthAgo; // Kiểm tra cây trồng trong tháng qua
  }).length;

  updateCharts(); // Cập nhật biểu đồ
}

// Hiển thị danh sách cây
function renderTreeList(data = treeData) {
  const tbody = document.getElementById("treeList");
  tbody.innerHTML = ""; // Xóa nội dung cũ của bảng

  data.forEach((tree) => {
    // Tạo một dòng trong bảng cho mỗi cây
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${tree.code}</td>
            <td>${tree.name}</td>
            <td>${tree.type}</td>
            <td>${tree.plantDate}</td>
            <td>${tree.status}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editTree('${tree.code}')">Sửa</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTree('${tree.code}')">Xóa</button>
            </td>
        `;
    tbody.appendChild(row); // Thêm dòng vào bảng
  });
}

// Thêm cây mới
document.getElementById("addTreeForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Ngừng hành động mặc định của form

  // Tạo đối tượng cây mới từ dữ liệu form
  const newTree = {
    code: document.getElementById("treeCode").value,
    name: document.getElementById("treeName").value,
    type: document.getElementById("treeType").value,
    plantDate: document.getElementById("plantDate").value,
    status: document.getElementById("treeStatus").value,
  };

  treeData.push(newTree); // Thêm cây mới vào danh sách
  updateDashboard(); // Cập nhật thống kê
  renderTreeList(); // Hiển thị lại danh sách cây
  this.reset(); // Reset form
  showSection("list"); // Chuyển về phần danh sách cây
});

// Xóa cây
function deleteTree(code) {
  if (confirm("Bạn có chắc muốn xóa cây này?")) {
    treeData = treeData.filter((tree) => tree.code !== code); // Loại bỏ cây theo mã
    updateDashboard(); // Cập nhật bảng điều khiển
    renderTreeList(); // Hiển thị lại danh sách cây
  }
}

// Sửa cây
function editTree(code) {
  const tree = treeData.find((t) => t.code === code); // Tìm cây theo mã
  if (tree) {
    // Điền thông tin cây vào form để chỉnh sửa
    document.getElementById("treeCode").value = tree.code;
    document.getElementById("treeName").value = tree.name;
    document.getElementById("treeType").value = tree.type;
    document.getElementById("plantDate").value = tree.plantDate;
    document.getElementById("treeStatus").value = tree.status;

    showSection("add"); // Chuyển về phần thêm cây
  }
}

// Hiển thị/ẩn các phần giao diện
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach((section) => {
    section.style.display = "none"; // Ẩn tất cả phần
  });
  document.getElementById(sectionId).style.display = "block"; // Hiển thị phần cần thiết

  if (sectionId === "overview" || sectionId === "report") {
    updateCharts(); // Cập nhật biểu đồ nếu đang ở phần tổng quan hoặc báo cáo
  }
}

// Cập nhật biểu đồ
function updateCharts() {
  // Biểu đồ trạng thái
  const statusCtx = document.getElementById("statusChart").getContext("2d");
  new Chart(statusCtx, {
    type: "pie", // Biểu đồ hình tròn
    data: {
      labels: ["Tốt", "Cần Chăm Sóc"],
      datasets: [
        {
          data: [
            treeData.filter((tree) => tree.status === "Tốt").length, // Số cây tốt
            treeData.filter((tree) => tree.status === "Cần Chăm Sóc").length, // Số cây cần chăm sóc
          ],
          backgroundColor: ["#28a745", "#dc3545"], // Màu sắc cho mỗi loại trạng thái
        },
      ],
    },
  });

  // Biểu đồ loại cây
  const typeCtx = document.getElementById("typeChart").getContext("2d");
  const treeTypes = [...new Set(treeData.map((tree) => tree.type))]; // Lấy các loại cây duy nhất
  new Chart(typeCtx, {
    type: "bar", // Biểu đồ cột
    data: {
      labels: treeTypes,
      datasets: [
        {
          label: "Số lượng",
          data: treeTypes.map(
            (type) => treeData.filter((tree) => tree.type === type).length // Số cây mỗi loại
          ),
          backgroundColor: "#007bff", // Màu cột
        },
      ],
    },
  });
}

// Khởi tạo
showSection("overview"); // Hiển thị phần tổng quan khi trang được tải

/*
1.  Dữ liệu: Dữ liệu về cây được tải từ data.json và được lưu vào treeData.
2.  Cập nhật bảng điều khiển: Hiển thị tổng số cây, số cây cần chăm sóc và cây mới trồng trong tháng qua.
3.  Thêm, sửa, xóa cây: Người dùng có thể thêm, sửa hoặc xóa cây từ danh sách. Các thay đổi sẽ được phản ánh trực tiếp trên giao diện.
4.  Biểu đồ: Cập nhật biểu đồ trạng thái cây (pie chart) và biểu đồ số lượng cây theo loại (bar chart).
5.  Giao diện: Chuyển đổi giữa các phần giao diện (thêm cây, danh sách cây, báo cáo) thông qua hàm showSection.
*/
