import axios from 'axios';

// Majestic 'store' is just a variable in our case
const store = {
  //3/ It holds a state itself
  state: {
    products: []
  },
  //6/ And methods to update
  async fetchProducts() {
    this.state.products = await axios.get('https://swapi.co/api/films').then(res => res.data.results);
  },
  addProduct(product) {
    this.state.products.push(product);
  },

  showProduct(product) {
    if (product.name === "") {
      this.fetchProducts()
    } else {
      this.state.products = this.state.products.filter((e) => {
        var toReturn = e.title.toLowerCase().trim() == product.name.toLowerCase().trim()
        // var toReturn = e.title.toLowerCase().trim().contains(product.name.toLowerCase().trim())
        return toReturn;
      })
    }
  }
};

export default store;
