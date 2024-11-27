class ChartManager {
  constructor() {
    // Khởi tạo một Map để lưu trữ các biểu đồ được quản lý
    this.charts = new Map();
  }

  destroyChart(chartId) {
    // Kiểm tra nếu biểu đồ với chartId tồn tại trong Map
    if (this.charts.has(chartId)) {
      // Hủy biểu đồ bằng phương thức destroy() của Chart.js
      this.charts.get(chartId).destroy();
      // Xóa biểu đồ khỏi Map sau khi đã hủy
      this.charts.delete(chartId);
    }
  }

  createStatusChart(data) {
    // Hủy biểu đồ "statusChart" và "statusReportChart" nếu đã tồn tại
    this.destroyChart("statusChart");
    this.destroyChart("statusReportChart");

    // Lấy ngữ cảnh 2D từ phần tử canvas với id "statusChart"
    const statusCtx = document.getElementById("statusChart").getContext("2d");
    // Lấy ngữ cảnh 2D từ phần tử canvas với id "statusReportChart"
    const statusReportCtx = document
      .getElementById("statusReportChart")
      .getContext("2d");

    // Tạo dữ liệu cho biểu đồ tình trạng (pie chart)
    const statusData = {
      labels: CONFIG.TREE_STATUS, // Nhãn biểu đồ dựa trên các trạng thái cây trong cấu hình
      datasets: [
        {
          data: [
            // Đếm số cây có tình trạng "Tốt"
            data.filter((tree) => tree.status === "Tốt").length,
            // Đếm số cây có tình trạng "Cần Chăm Sóc"
            data.filter((tree) => tree.status === "Cần Chăm Sóc").length,
          ],
          // Màu nền cho mỗi phần của biểu đồ
          backgroundColor: [
            CONFIG.CHART_COLORS.good,
            CONFIG.CHART_COLORS.warning,
          ],
        },
      ],
    };

    // Tạo biểu đồ pie cho tình trạng cây
    const statusChart = new Chart(statusCtx, {
      type: "pie", // Loại biểu đồ: Pie chart
      data: statusData, // Dữ liệu của biểu đồ
      options: {
        ...CONFIG.CHART_OPTIONS, // Các tùy chọn chung từ cấu hình
        plugins: {
          legend: {
            position: "bottom", // Vị trí chú giải: phía dưới
            labels: {
              font: {
                size: 14, // Kích thước font chữ của nhãn
              },
            },
          },
          title: {
            display: true, // Hiển thị tiêu đề
            text: "Phân Bố Tình Trạng", // Nội dung tiêu đề
            font: {
              size: 16, // Kích thước tiêu đề
              weight: "bold", // Đậm chữ
            },
          },
        },
      },
    });

    // Tạo dữ liệu và cấu hình cho biểu đồ chi tiết tình trạng theo loại cây
    const statusReportChart = new Chart(statusReportCtx, {
      type: "doughnut", // Loại biểu đồ: Doughnut chart
      data: {
        labels: CONFIG.TREE_TYPES.reduce((acc, type) => {
          // Tạo nhãn dạng "<loại cây> - Tốt" và "<loại cây> - Cần Chăm Sóc"
          acc.push(`${type} - Tốt`);
          acc.push(`${type} - Cần Chăm Sóc`);
          return acc;
        }, []),
        datasets: [
          {
            data: CONFIG.TREE_TYPES.reduce((acc, type) => {
              // Đếm số cây "Tốt" và "Cần Chăm Sóc" cho từng loại cây
              acc.push(
                data.filter(
                  (tree) => tree.type === type && tree.status === "Tốt"
                ).length
              );
              acc.push(
                data.filter(
                  (tree) => tree.type === type && tree.status === "Cần Chăm Sóc"
                ).length
              );
              return acc;
            }, []),
            backgroundColor: CONFIG.TREE_TYPES.reduce((acc) => {
              // Màu sắc tương ứng cho từng tình trạng
              acc.push(CONFIG.CHART_COLORS.good);
              acc.push(CONFIG.CHART_COLORS.warning);
              return acc;
            }, []),
          },
        ],
      },
      options: {
        ...CONFIG.CHART_OPTIONS,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              font: {
                size: 12,
              },
            },
          },
          title: {
            display: true,
            text: "Chi Tiết Tình Trạng Theo Loại",
            font: {
              size: 16,
              weight: "bold",
            },
          },
        },
      },
    });

    // Lưu trữ biểu đồ vừa tạo vào Map
    this.charts.set("statusChart", statusChart);
    this.charts.set("statusReportChart", statusReportChart);
  }

  createTypeChart(data) {
    // Hủy biểu đồ "typeChart" nếu đã tồn tại
    this.destroyChart("typeChart");

    // Lấy ngữ cảnh 2D từ phần tử canvas với id "typeChart"
    const ctx = document.getElementById("typeChart").getContext("2d");

    // Tạo dữ liệu cho biểu đồ loại cây
    const typeData = {
      labels: CONFIG.TREE_TYPES, // Nhãn dựa trên danh sách loại cây
      datasets: [
        {
          label: "Số lượng", // Nhãn dataset
          data: CONFIG.TREE_TYPES.map(
            // Đếm số lượng cây cho từng loại
            (type) => data.filter((tree) => tree.type === type).length
          ),
          backgroundColor: [
            CONFIG.CHART_COLORS.primary, // Màu nền đầu tiên
            CONFIG.CHART_COLORS.success, // Màu nền thứ hai
            CONFIG.CHART_COLORS.info, // Màu nền thứ ba
          ],
        },
      ],
    };

    // Tạo biểu đồ cột (bar chart)
    const chart = new Chart(ctx, {
      type: "bar",
      data: typeData,
      options: {
        ...CONFIG.CHART_OPTIONS,
        scales: {
          y: {
            beginAtZero: true, // Bắt đầu trục Y từ 0
            ticks: {
              stepSize: 1, // Khoảng cách giữa các giá trị trên trục Y
              font: {
                size: 12,
              },
            },
          },
          x: {
            ticks: {
              font: {
                size: 12,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false, // Ẩn chú giải
          },
          title: {
            display: true,
            text: "Phân Bố Theo Loại Cây", // Tiêu đề của biểu đồ
            font: {
              size: 16,
              weight: "bold",
            },
          },
        },
      },
    });

    // Lưu trữ biểu đồ vào Map
    this.charts.set("typeChart", chart);
  }

  updateAllCharts(data) {
    // Cập nhật biểu đồ tình trạng
    this.createStatusChart(data);
    // Cập nhật biểu đồ loại cây
    this.createTypeChart(data);
  }
}

/*
Lớp ChartManager quản lý việc tạo, hủy và cập nhật biểu đồ bằng Chart.js. Nó có các phương thức để:

1. Hủy biểu đồ cũ (destroyChart).
2. Tạo biểu đồ tỷ lệ tình trạng cây (createStatusChart).
3. Tạo biểu đồ số lượng cây theo loại (createTypeChart).
4. Cập nhật tất cả biểu đồ (updateAllCharts). 
*/
