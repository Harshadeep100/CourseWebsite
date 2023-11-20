// This is the Vue instance and script 
new Vue({
    el: '#app',
    data: {
      products:[],
      categories: [],
      selectedCategory: '',
      keyword: '',
      currentPage: 1,
      itemsPerPage: 9,
    },
    computed: {
      filteredProducts() {
        let filtered = this.products;
  
        if (this.selectedCategory !== '') {
          filtered = filtered.filter(product =>
            product.category === this.selectedCategory
          );
        }
  
        if (this.keyword !== '') {
          const lowerKeyword = this.keyword.toLowerCase();
          filtered = filtered.filter(product =>
            product.title.toLowerCase().includes(lowerKeyword)
          );
        }
        // This is the slicing on current page and the number of items per page
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return filtered.slice(start, start + this.itemsPerPage);
      },
      // Calculation of total pages in pagination
      totalPages() {
        return Math.ceil(this.products.length / this.itemsPerPage);
      },
    },
    methods: {
      // Here I fetch the products and change the pages
      fetchProducts() {
        // This is fetching data from the database
        fetch('db.json')
          .then(response => response.json())
          .then(data => {
            console.log("test: ", data.products)
            this.products = data.products;
          })
          .catch(error => {
            console.error('Error fetching products:', error);
          });
      },
      // This is the method to change the current page
      changePage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
        }
      },
    },
    // Here I fetch products on component mount
    mounted() {
      this.fetchProducts();
    },
  });
  