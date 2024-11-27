// Cài đặt cấu hình
const CONFIG = {
  CHART_COLORS: {
    good: "#28a745", // Màu tốt
    warning: "#ffc107", // Màu cảnh báo
    danger: "#dc3545", // Màu nguy hiểm
    primary: "#0d6efd", // Màu chính
    secondary: "#6c757d", // Màu phụ
    success: "#198754", // Màu thành công
    info: "#0dcaf0", // Màu thông tin
  },
  TREE_TYPES: ["Cây Cảnh", "Cây Ăn Trái", "Cây Bóng Mát"], // Các loại cây
  TREE_STATUS: ["Tốt", "Cần Chăm Sóc"], // Trạng thái cây
  API_ENDPOINT: "data.json", // Điểm cuối API
  CHART_OPTIONS: {
    responsive: true, // Đáp ứng
    maintainAspectRatio: false, // Duy trì tỷ lệ khung hình
    animation: {
      duration: 1000, // Thời gian hoạt hình
      easing: "easeInOutQuart", // Hiệu ứng hoạt hình
    },
    plugins: {
      legend: {
        position: "bottom", // Vị trí chú giải
        labels: {
          padding: 20, // Khoảng cách
          usePointStyle: true, // Sử dụng kiểu điểm
          pointStyle: "circle", // Kiểu điểm hình tròn
        },
      },
    },
  },
};
//
const BINARY_SEARCH_TREE_CONFIG = {
  allowDuplicates: false, // Cho phép giá trị trùng lặp
  traversalOrder: "inOrder", // Thứ tự duyệt cây: inOrder, preOrder, postOrder
  balanceTree: true, // Tự động cân bằng cây
  nodeColors: {
    default: "#6c757d", // Màu mặc định của nút
    highlight: "#0d6efd", // Màu nổi bật của nút
  },
};

CONFIG.BINARY_SEARCH_TREE_CONFIG = BINARY_SEARCH_TREE_CONFIG;
