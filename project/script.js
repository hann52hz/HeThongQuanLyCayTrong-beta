let treeData = [];

// Tải dữ liệu ban đầu
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        treeData = data;
        updateDashboard();
        renderTreeList();
    });

// Triển khai tìm kiếm nhị phân
function binarySearch(arr, key, property) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid][property] === key) return mid;
        if (arr[mid][property] < key) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// Hàm tìm kiếm cây
function searchTrees() {
    const searchValue = document.getElementById('searchInput').value;
    const searchType = document.getElementById('searchType').value;
    
    const sortedData = [...treeData].sort((a, b) => 
        a[searchType].localeCompare(b[searchType])
    );
    
    const index = binarySearch(sortedData, searchValue, searchType);
    
    if (index !== -1) {
        const result = [sortedData[index]];
        renderTreeList(result);
    } else {
        // Nếu không tìm thấy kết quả chính xác, hiển thị kết quả lọc
        const filteredData = treeData.filter(tree => 
            tree[searchType].toLowerCase().includes(searchValue.toLowerCase())
        );
        renderTreeList(filteredData);
    }
}

// Cập nhật thống kê bảng điều khiển
function updateDashboard() {
    document.getElementById('totalTrees').textContent = treeData.length;
    document.getElementById('needCare').textContent = 
        treeData.filter(tree => tree.status === 'Cần Chăm Sóc').length;
    document.getElementById('newTrees').textContent = 
        treeData.filter(tree => {
            const plantDate = new Date(tree.plantDate);
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            return plantDate >= oneMonthAgo;
        }).length;
    
    updateCharts();
}

// Hiển thị danh sách cây
function renderTreeList(data = treeData) {
    const tbody = document.getElementById('treeList');
    tbody.innerHTML = '';
    
    data.forEach(tree => {
        const row = document.createElement('tr');
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
        tbody.appendChild(row);
    });
}

// Thêm cây mới
document.getElementById('addTreeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newTree = {
        code: document.getElementById('treeCode').value,
        name: document.getElementById('treeName').value,
        type: document.getElementById('treeType').value,
        plantDate: document.getElementById('plantDate').value,
        status: document.getElementById('treeStatus').value
    };
    
    treeData.push(newTree);
    updateDashboard();
    renderTreeList();
    this.reset();
    showSection('list');
});

// Xóa cây
function deleteTree(code) {
    if (confirm('Bạn có chắc muốn xóa cây này?')) {
        treeData = treeData.filter(tree => tree.code !== code);
        updateDashboard();
        renderTreeList();
    }
}

// Sửa cây
function editTree(code) {
    const tree = treeData.find(t => t.code === code);
    if (tree) {
        document.getElementById('treeCode').value = tree.code;
        document.getElementById('treeName').value = tree.name;
        document.getElementById('treeType').value = tree.type;
        document.getElementById('plantDate').value = tree.plantDate;
        document.getElementById('treeStatus').value = tree.status;
        
        showSection('add');
    }
}

// Hiển thị/ẩn các phần
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
    
    if (sectionId === 'overview' || sectionId === 'report') {
        updateCharts();
    }
}

// Cập nhật biểu đồ
function updateCharts() {
    // Biểu đồ trạng thái
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    new Chart(statusCtx, {
        type: 'pie',
        data: {
            labels: ['Tốt', 'Cần Chăm Sóc'],
            datasets: [{
                data: [
                    treeData.filter(tree => tree.status === 'Tốt').length,
                    treeData.filter(tree => tree.status === 'Cần Chăm Sóc').length
                ],
                backgroundColor: ['#28a745', '#dc3545']
            }]
        }
    });
    
    // Biểu đồ loại cây
    const typeCtx = document.getElementById('typeChart').getContext('2d');
    const treeTypes = [...new Set(treeData.map(tree => tree.type))];
    new Chart(typeCtx, {
        type: 'bar',
        data: {
            labels: treeTypes,
            datasets: [{
                label: 'Số lượng',
                data: treeTypes.map(type => 
                    treeData.filter(tree => tree.type === type).length
                ),
                backgroundColor: '#007bff'
            }]
        }
    });
}

// Khởi tạo
showSection('overview');