let statusChart = null; // Biến lưu trữ biểu đồ tình trạng cây (status chart)
let typeChart = null; // Biến lưu trữ biểu đồ loại cây (type chart)

// Hàm cập nhật thông tin tổng quan trên dashboard
export function updateDashboard(treeData) {
  // Cập nhật số lượng cây tổng cộng
  document.getElementById("totalTrees").textContent = treeData.length;

  // Cập nhật số lượng cây cần chăm sóc
  document.getElementById("needCare").textContent = treeData.filter(
    (tree) => tree.status === "Cần Chăm Sóc"
  ).length;

  // Cập nhật số lượng cây mới trồng trong tháng qua
  document.getElementById("newTrees").textContent = treeData.filter((tree) => {
    const plantDate = new Date(tree.plantDate); // Ngày trồng cây
    const oneMonthAgo = new Date(); // Ngày hiện tại
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Một tháng trước
    return plantDate >= oneMonthAgo; // Kiểm tra cây trồng trong tháng qua
  }).length;

  // Cập nhật các biểu đồ với dữ liệu cây
  updateCharts(treeData);
}

// Hàm cập nhật biểu đồ trên dashboard
export function updateCharts(treeData) {
  // Hủy các biểu đồ cũ nếu đã tồn tại
  if (statusChart) {
    statusChart.destroy();
  }
  if (typeChart) {
    typeChart.destroy();
  }

  // Tạo biểu đồ tình trạng cây (pie chart)
  const statusCtx = document.getElementById("statusChart").getContext("2d"); // Lấy ngữ cảnh canvas
  statusChart = new Chart(statusCtx, {
    type: "pie", // Biểu đồ dạng pie
    data: {
      labels: ["Tốt", "Cần Chăm Sóc"], // Nhãn của biểu đồ
      datasets: [
        {
          data: [
            // Số cây "Tốt"
            treeData.filter((tree) => tree.status === "Tốt").length,
            // Số cây "Cần Chăm Sóc"
            treeData.filter((tree) => tree.status === "Cần Chăm Sóc").length,
          ],
          backgroundColor: ["#28a745", "#dc3545"], // Màu sắc cho các phần của biểu đồ
        },
      ],
    },
    options: {
      responsive: true, // Đảm bảo biểu đồ đáp ứng với kích thước màn hình
      maintainAspectRatio: false, // Không giữ tỷ lệ khung hình cố định
      plugins: {
        legend: {
          position: "bottom", // Chú giải biểu đồ nằm ở dưới
        },
      },
    },
  });

  // Tạo biểu đồ phân loại cây (bar chart)
  const typeCtx = document.getElementById("typeChart").getContext("2d"); // Lấy ngữ cảnh canvas
  const treeTypes = [...new Set(treeData.map((tree) => tree.type))]; // Lấy danh sách các loại cây duy nhất
  typeChart = new Chart(typeCtx, {
    type: "bar", // Biểu đồ dạng cột
    data: {
      labels: treeTypes, // Nhãn cho các loại cây
      datasets: [
        {
          label: "Số lượng", // Nhãn cho dataset
          data: treeTypes.map(
            (type) => treeData.filter((tree) => tree.type === type).length // Đếm số lượng cây theo loại
          ),
          backgroundColor: "#007bff", // Màu nền cho các cột
        },
      ],
    },
    options: {
      responsive: true, // Đảm bảo biểu đồ đáp ứng với kích thước màn hình
      maintainAspectRatio: false, // Không giữ tỷ lệ khung hình cố định
      plugins: {
        legend: {
          display: false, // Ẩn chú giải
        },
      },
      scales: {
        y: {
          beginAtZero: true, // Bắt đầu trục Y từ 0
          ticks: {
            stepSize: 1, // Khoảng cách giữa các giá trị trên trục Y
          },
        },
      },
    },
  });
}

/*
1. updateDashboard: Cập nhật các thông tin tổng quan về cây:
    Tổng số cây.
    Số cây cần chăm sóc.
    Số cây mới trồng trong tháng qua. Sau đó, gọi updateCharts để cập nhật các biểu đồ.
2. updateCharts: Cập nhật các biểu đồ:
    Biểu đồ tình trạng cây (pie chart) để hiển thị tỷ lệ cây "Tốt" và "Cần Chăm Sóc".
    Biểu đồ phân loại cây (bar chart) để hiển thị số lượng cây theo từng loại.
    Mỗi khi cập nhật, các biểu đồ cũ được hủy trước khi tạo mới, đảm bảo việc sử dụng tài nguyên hợp lý.
    */
