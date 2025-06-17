const { createApp } = Vue;

createApp({
  data() {
    return {
      sites: [
        { name: '內部系統', url: 'http://intranet.local', frontendPort: 80, backendPort: 8080, firewall: '是' },
        { name: '公開網站', url: 'https://example.com', frontendPort: 443, backendPort: 8000, firewall: '否' },
        // 可自行擴充資料來測試分頁
      ],
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    pagedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.sites.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.sites.length / this.itemsPerPage);
    }
  },
  methods: {
    addRow() {
      this.sites.push({
        name: '',
        url: '',
        frontendPort: '',
        backendPort: '',
        firewall: '否'
      });
      this.currentPage = this.totalPages; // 新增後跳到最後一頁
    },
    removeRow(indexOnPage) {
      const globalIndex = (this.currentPage - 1) * this.itemsPerPage + indexOnPage;
      this.sites.splice(globalIndex, 1);
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages || 1;
      }
    },
    saveChanges() {
      console.log('儲存內容：', this.sites);
      alert('資料已儲存（模擬）');
      // 若要串接後端可用 axios.post('/api/save', this.sites)
    },
    prevPage() {
        if (this.currentPage > 1) {
        this.currentPage--;
        }
    },
    nextPage() {
        if (this.currentPage < this.totalPages) {
        this.currentPage++;
        }
    }
    }
}).mount('#app');
