let treeManager; // Biến lưu trữ đối tượng TreeManager

// Hàm khởi tạo ứng dụng, tải dữ liệu cây từ API và khởi tạo TreeManager
async function initializeApp() {
  try {
    const response = await fetch(CONFIG.API_ENDPOINT); // Lấy dữ liệu từ API
    const data = await response.json(); // Chuyển dữ liệu nhận được từ JSON

    // Khởi tạo TreeManager với dữ liệu cây
    treeManager = new TreeManager(data);
    treeManager.updateUI(); // Cập nhật giao diện người dùng với dữ liệu cây

    setupEventListeners(); // Thiết lập các sự kiện
  } catch (error) {
    console.error("Lỗi khi khởi tạo ứng dụng:", error);
    // Hiển thị thông báo lỗi nếu không thể tải dữ liệu
    Utils.showToast("Không thể tải dữ liệu", "error");
  }
}

// Hàm thiết lập các sự kiện cho các phần tử trên trang
function setupEventListeners() {
  // Thêm sự kiện submit cho form thêm cây
  document
    .getElementById("addTreeForm")
    .addEventListener("submit", function (e) {
      e.preventDefault(); // Ngăn form tự động gửi đi

      // Lấy dữ liệu từ form
      const formData = {
        code: document.getElementById("treeCode").value,
        name: document.getElementById("treeName").value,
        type: document.getElementById("treeType").value,
        plantDate: document.getElementById("plantDate").value,
        status: document.getElementById("treeStatus").value,
      };

      // Thêm cây vào TreeManager và cập nhật UI
      if (treeManager.addTree(formData)) {
        this.reset(); // Reset lại form
        showSection("list"); // Hiển thị phần danh sách cây
      }
    });

  // Thêm sự kiện tìm kiếm cây
  document.getElementById("searchInput").addEventListener(
    "input",
    Utils.debounce(() => treeManager.performSearch(), 300) // Gọi phương thức tìm kiếm với debounce
  );
}

// Hàm hiển thị các phần tử giao diện (section) dựa trên ID
window.showSection = function (sectionId) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active"); // Ẩn tất cả các phần
  });
  document.getElementById(sectionId).classList.add("active"); // Hiển thị phần cần thiết
};

// Hàm reset form khi người dùng muốn nhập lại
window.resetForm = function () {
  document.getElementById("addTreeForm").reset(); // Reset lại form
  document.getElementById("treeCode").value = Utils.generateTreeCode(); // Tạo mã cây mới
};

// Lưu đối tượng treeManager vào window để có thể truy cập từ ngoài
window.treeManager = treeManager;

// Khởi tạo ứng dụng sau khi DOM đã tải xong
document.addEventListener("DOMContentLoaded", initializeApp);

/*
1. initializeApp: Khởi tạo ứng dụng bằng cách tải dữ liệu cây từ API và tạo đối tượng TreeManager với dữ liệu này. Sau đó, cập nhật UI và thiết lập các sự kiện.
2. setupEventListeners: Thiết lập các sự kiện cho form thêm cây và input tìm kiếm. Sử dụng debounce cho sự kiện tìm kiếm để giảm tải tài nguyên.
3. showSection: Chuyển đổi giữa các phần của giao diện (sections) bằng cách thay đổi lớp CSS active.
4. resetForm: Đặt lại form và tạo mã cây mới khi người dùng thêm cây mới.
5. Sự kiện DOMContentLoaded: Khởi tạo ứng dụng sau khi tài liệu HTML được tải xong.
**************************************************************
Chức năng chính:
Quản lý việc thêm cây mới, tìm kiếm cây, và chuyển đổi giữa các phần trong giao diện người dùng.
*/
