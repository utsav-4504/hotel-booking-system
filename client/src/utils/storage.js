const storage = {
  // Get item from localStorage
  get(key, fallback = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (error) {
      console.error(`Error getting ${key} from storage:`, error);
      return fallback;
    }
  },

  // Set item in localStorage
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in storage:`, error);
      return false;
    }
  },

  // Remove item from localStorage
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from storage:`, error);
      return false;
    }
  },

  // Clear all localStorage
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing storage:", error);
      return false;
    }
  },

  // Check if key exists
  has(key) {
    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      return false;
    }
  },

  // Get all keys
  keys() {
    try {
      return Object.keys(localStorage);
    } catch (error) {
      return [];
    }
  },

  // Get all items
  getAll() {
    try {
      const items = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        items[key] = this.get(key);
      }
      return items;
    } catch (error) {
      return {};
    }
  },

  // Set multiple items at once
  setMultiple(items) {
    try {
      Object.entries(items).forEach(([key, value]) => {
        this.set(key, value);
      });
      return true;
    } catch (error) {
      console.error("Error setting multiple items:", error);
      return false;
    }
  },

  // Remove multiple items
  removeMultiple(keys) {
    try {
      keys.forEach((key) => this.remove(key));
      return true;
    } catch (error) {
      console.error("Error removing multiple items:", error);
      return false;
    }
  },

  // Get storage size in bytes
  getSize() {
    try {
      let size = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          size += localStorage[key].length + key.length;
        }
      }
      return size;
    } catch (error) {
      return 0;
    }
  },

  // Format storage size
  getFormattedSize() {
    const size = this.getSize();
    const kb = size / 1024;
    const mb = kb / 1024;

    if (mb > 1) return `${mb.toFixed(2)} MB`;
    if (kb > 1) return `${kb.toFixed(2)} KB`;
    return `${size} bytes`;
  }
};

export default storage;