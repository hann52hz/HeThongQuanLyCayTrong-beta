// Quản lý biểu đồ
class ChartManager {
    constructor() {
      // Khởi tạo một Map để lưu trữ các biểu đồ
      this.charts = new Map();
    }
  
    // Hàm hủy biểu đồ theo ID
    destroyChart(chartId) {
      // Kiểm tra xem biểu đồ có tồn tại không
      if (this.charts.has(chartId)) {
        // Hủy biểu đồ
        this.charts.get(chartId).destroy();
        // Xóa biểu đồ khỏi Map
        this.charts.delete(chartId);
      }
    }
  
    // Hàm tạo biểu đồ tình trạng
    createStatusChart(data) {
      // Hủy biểu đồ tình trạng nếu đã tồn tại
      this.destroyChart("statusChart");
      this.destroyChart("statusReportChart");
  
      // Lấy ngữ cảnh vẽ của canvas cho biểu đồ tình trạng
      const statusCtx = document.getElementById("statusChart").getContext("2d");
      const statusReportCtx = document
        .getElementById("statusReportChart")
        .getContext("2d");
  
      // Dữ liệu cho biểu đồ tình trạng
      const statusData = {
        labels: CONFIG.TREE_STATUS,
        datasets: [
          {
            // Đếm số lượng cây theo tình trạng
            data: [
              data.filter((tree) => tree.status === "Tốt").length,
              data.filter((tree) => tree.status === "Cần Chăm Sóc").length,
            ],
            // Màu nền cho các phần của biểu đồ
            backgroundColor: [
              CONFIG.CHART_COLORS.good,
              CONFIG.CHART_COLORS.warning,
            ],
          },
        ],
      };
  
      // Tạo biểu đồ tình trạng chính
      const statusChart = new Chart(statusCtx, {
        type: "pie", // Loại biểu đồ là biểu đồ tròn
        data: statusData,
        options: {
          ...CONFIG.CHART_OPTIONS,
          plugins: {
            legend: {
              position: "bottom", // Vị trí của chú giải
              labels: {
                font: {
                  size: 14, // Kích thước chữ của chú giải
                },
              },
            },
            title: {
              display: true, // Hiển thị tiêu đề
              text: "Phân Bố Tình Trạng", // Nội dung tiêu đề
              font: {
                size: 16, // Kích thước chữ của tiêu đề
                weight: "bold", // Độ đậm của chữ
              },
            },
          },
        },
      });
  
      // Tạo biểu đồ báo cáo tình trạng chi tiết
      const statusReportChart = new Chart(statusReportCtx, {
        type: "doughnut", // Loại biểu đồ là biểu đồ bánh rán
        data: {
          // Tạo nhãn cho từng loại cây và tình trạng
          labels: CONFIG.TREE_TYPES.reduce((acc, type) => {
            acc.push(`${type} - Tốt`);
            acc.push(`${type} - Cần Chăm Sóc`);
            return acc;
          }, []),
          datasets: [
            {
              // Đếm số lượng cây theo loại và tình trạng
              data: CONFIG.TREE_TYPES.reduce((acc, type) => {
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
              // Màu nền cho các phần của biểu đồ
              backgroundColor: CONFIG.TREE_TYPES.reduce((acc) => {
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
              position: "bottom", // Vị trí của chú giải
              labels: {
                font: {
                  size: 12, // Kích thước chữ của chú giải
                },
              },
            },
            title: {
              display: true, // Hiển thị tiêu đề
              text: "Chi Tiết Tình Trạng Theo Loại", // Nội dung tiêu đề
              font: {
                size: 16, // Kích thước chữ của tiêu đề
                weight: "bold", // Độ đậm của chữ
              },
            },
          },
        },
      });
  
      // Lưu biểu đồ vào Map
      this.charts.set("statusChart", statusChart);
      this.charts.set("statusReportChart", statusReportChart);
    }
  
    // Hàm tạo biểu đồ loại cây
    createTypeChart(data) {
      // Hủy biểu đồ loại cây nếu đã tồn tại
      this.destroyChart("typeChart");
  
      // Lấy ngữ cảnh vẽ của canvas cho biểu đồ loại cây
      const ctx = document.getElementById("typeChart").getContext("2d");
      const typeData = {
        labels: CONFIG.TREE_TYPES,
        datasets: [
          {
            label: "Số lượng", // Nhãn của tập dữ liệu
            // Đếm số lượng cây theo loại
            data: CONFIG.TREE_TYPES.map(
              (type) => data.filter((tree) => tree.type === type).length
            ),
            // Màu nền cho các phần của biểu đồ
            backgroundColor: [
              CONFIG.CHART_COLORS.primary,
              CONFIG.CHART_COLORS.success,
              CONFIG.CHART_COLORS.info,
            ],
          },
        ],
      };
  
      // Tạo biểu đồ loại cây
      const chart = new Chart(ctx, {
        type: "bar", // Loại biểu đồ là biểu đồ cột
        data: typeData,
        options: {
          ...CONFIG.CHART_OPTIONS,
          scales: {
            y: {
              beginAtZero: true, // Bắt đầu trục y từ 0
              ticks: {
                stepSize: 1, // Bước nhảy của trục y
                font: {
                  size: 12, // Kích thước chữ của trục y
                },
              },
            },
            x: {
              ticks: {
                font: {
                  size: 12, // Kích thước chữ của trục x
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false, // Không hiển thị chú giải
            },
            title: {
              display: true, // Hiển thị tiêu đề
              text: "Phân Bố Theo Loại Cây", // Nội dung tiêu đề
              font: {
                size: 16, // Kích thước chữ của tiêu đề
                weight: "bold", // Độ đậm của chữ
              },
            },
          },
        },
      });
  
      // Lưu biểu đồ vào Map
      this.charts.set("typeChart", chart);
    }
  
    // Hàm cập nhật tất cả các biểu đồ
    updateAllCharts(data) {
      // Tạo lại biểu đồ tình trạng
      this.createStatusChart(data);
      // Tạo lại biểu đồ loại cây
      this.createTypeChart(data);
    }
  }