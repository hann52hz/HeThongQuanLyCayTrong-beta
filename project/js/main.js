// Logic chính của ứng dụng
let treeManager;

// Khởi tạo ứng dụng
async function initializeApp() {
    try {
        const response = await fetch(CONFIG.API_ENDPOINT);
        const data = await response.json();
        
        treeManager = new TreeManager(data);
        treeManager.updateUI();
        
        // Thiết lập các sự kiện
        setupEventListeners();
        
    } catch (error) {
        console.error('Lỗi khi khởi tạo ứng dụng:', error);
        Utils.showToast('Không thể tải dữ liệu', 'error');
    }
}

// Thiết lập các sự kiện
function setupEventListeners() {
    // Gửi form
    document.getElementById('addTreeForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            code: document.getElementById('treeCode').value,
            name: document.getElementById('treeName').value,
            type: document.getElementById('treeType').value,
            plantDate: document.getElementById('plantDate').value,
            status: document.getElementById('treeStatus').value
        };
        
        if (treeManager.addTree(formData)) {
            this.reset();
            showSection('list');
        }
    });

    // Ô tìm kiếm
    document.getElementById('searchInput').addEventListener('input', 
        Utils.debounce(() => treeManager.performSearch(), 300)
    );
}

// Hiển thị/ẩn các phần
window.showSection = function(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Reset form
window.resetForm = function() {
    document.getElementById('addTreeForm').reset();
    document.getElementById('treeCode').value = Utils.generateTreeCode();
}

// Làm cho treeManager có sẵn toàn cầu
window.treeManager = treeManager;

// Khởi tạo ứng dụng khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', initializeApp);