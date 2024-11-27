// Utility functions
const Utils = {
  formatDate: (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  },

  generateTreeCode: () => {
    return "CT" + String(Math.floor(Math.random() * 9000) + 1000);
  },

  validateForm: (formData) => {
    for (let [key, value] of Object.entries(formData)) {
      if (!value || value.trim() === "") {
        return false;
      }
    }
    return true;
  },

  showToast: (message, type = "success") => {
    // Implementation for showing toast messages
    alert(message);
  },

  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
};
