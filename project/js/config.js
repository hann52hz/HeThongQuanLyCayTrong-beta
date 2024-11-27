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

/*
1. CONFIG:
    CHART_COLORS: Màu sắc cho các trạng thái và biểu đồ (tốt, cảnh báo, nguy hiểm, chính, phụ, thành công, thông tin).
    TREE_TYPES: Danh sách các loại cây (Cây Cảnh, Cây Ăn Trái, Cây Bóng Mát).
    TREE_STATUS: Các trạng thái cây ("Tốt", "Cần Chăm Sóc").
    API_ENDPOINT: Điểm cuối API để lấy dữ liệu.
    CHART_OPTIONS: Cấu hình cho biểu đồ (đáp ứng, hoạt hình, chú giải).

2. BINARY_SEARCH_TREE_CONFIG:
    allowDuplicates: Cho phép hoặc không cho phép giá trị trùng lặp trong cây.
    traversalOrder: Định nghĩa thứ tự duyệt cây (inOrder, preOrder, postOrder).
    balanceTree: Tự động cân bằng cây nhị phân.
    nodeColors: Màu sắc của các nút trong cây (mặc định và nổi bật). 
*/
