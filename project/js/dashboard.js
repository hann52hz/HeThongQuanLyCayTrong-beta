// Chức năng Bảng điều khiển
let statusChart = null;
let typeChart = null;

export function updateDashboard(treeData) {
  document.getElementById("totalTrees").textContent = treeData.length;
  document.getElementById("needCare").textContent = treeData.filter(
    (tree) => tree.status === "Cần Chăm Sóc"
  ).length;
  document.getElementById("newTrees").textContent = treeData.filter((tree) => {
    const plantDate = new Date(tree.plantDate);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return plantDate >= oneMonthAgo;
  }).length;

  updateCharts(treeData);
}

export function updateCharts(treeData) {
  // Hủy biểu đồ hiện tại
  if (statusChart) {
    statusChart.destroy();
  }
  if (typeChart) {
    typeChart.destroy();
  }

  // Biểu đồ Trạng thái
  const statusCtx = document.getElementById("statusChart").getContext("2d");
  statusChart = new Chart(statusCtx, {
    type: "pie",
    data: {
      labels: ["Tốt", "Cần Chăm Sóc"],
      datasets: [
        {
          data: [
            treeData.filter((tree) => tree.status === "Tốt").length,
            treeData.filter((tree) => tree.status === "Cần Chăm Sóc").length,
          ],
          backgroundColor: ["#28a745", "#dc3545"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });

  // Biểu đồ Loại cây
  const typeCtx = document.getElementById("typeChart").getContext("2d");
  const treeTypes = [...new Set(treeData.map((tree) => tree.type))];
  typeChart = new Chart(typeCtx, {
    type: "bar",
    data: {
      labels: treeTypes,
      datasets: [
        {
          label: "Số lượng",
          data: treeTypes.map(
            (type) => treeData.filter((tree) => tree.type === type).length
          ),
          backgroundColor: "#007bff",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  });
}
