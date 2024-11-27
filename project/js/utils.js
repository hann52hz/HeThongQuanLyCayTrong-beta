// Các hàm tiện ích (Utility functions)
const Utils = {
  // Hàm định dạng ngày theo kiểu ngày tháng năm (vi-VN)
  formatDate: (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN"); // Định dạng ngày theo ngôn ngữ tiếng Việt
  },

  // Hàm tạo mã cây ngẫu nhiên
  generateTreeCode: () => {
    return "CT" + String(Math.floor(Math.random() * 9000) + 1000); // Tạo mã cây dạng CTXXXX, với XXXX là số ngẫu nhiên từ 1000 đến 9999
  },

  // Hàm kiểm tra tính hợp lệ của dữ liệu trong form
  validateForm: (formData) => {
    for (let [key, value] of Object.entries(formData)) {
      if (!value || value.trim() === "") {
        // Nếu có trường dữ liệu nào trống hoặc chỉ chứa khoảng trắng
        return false; // Trả về false nếu không hợp lệ
      }
    }
    return true; // Trả về true nếu tất cả các trường đều hợp lệ
  },

  // Hàm hiển thị thông báo dạng toast
  showToast: (message, type = "success") => {
    alert(message); // Sử dụng alert để hiển thị thông báo (có thể thay bằng toast library thực tế)
  },

  // Hàm debounce giúp giảm số lần gọi hàm trong một khoảng thời gian ngắn
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout); // Hủy bỏ timeout cũ nếu có
        func(...args); // Gọi hàm thực tế
      };
      clearTimeout(timeout); // Hủy bỏ timeout trước đó
      timeout = setTimeout(later, wait); // Thiết lập timeout mới
    };
  },
};

/*
1. formatDate: Chuyển đổi chuỗi ngày tháng thành định dạng ngày tháng năm kiểu Việt Nam.
2. generateTreeCode: Tạo một mã cây ngẫu nhiên theo định dạng "CT" + 4 chữ số ngẫu nhiên.
3. validateForm: Kiểm tra tính hợp lệ của dữ liệu trong form, trả về false nếu có trường nào trống hoặc chỉ có khoảng trắng.
4. showToast: Hiển thị thông báo dạng toast (hiện tại sử dụng alert).
5. debounce: Giảm tần suất gọi hàm liên tiếp trong một khoảng thời gian ngắn bằng cách chỉ gọi hàm sau một khoảng thời gian chờ.
**************************************************************
Chức năng chính:
Hỗ trợ xử lý ngày tháng, mã ngẫu nhiên, xác minh dữ liệu form, hiển thị thông báo và giảm tần suất gọi hàm.
*/
