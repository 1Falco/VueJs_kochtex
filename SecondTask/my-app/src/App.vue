<template>
  <div id="app">
    <div class="col-sm-6 col-xs-6 col-md-6">
    <h2>My awesome list</h2>
    <!-- <product-list-sort @order-add="onAddOrder" :products="products"></product-list-sort> -->
    <product-list @order-add="onAddOrder" :products="sharedState.products"></product-list>
    <p>Click on objects to add them to your order list</p>
    <product-add @product-add="onAddProduct" @search-product="onProductSearch"></product-add>
    <br>
    <button v-on:click="removeLast()">Remove last item</button>
  </div>
  <div class="col-sm-6 col-xs-6 col-md-6">
        <h2>My order list</h2>
    <!-- <ul>
      <li v-on:click="removeItem(o)" v-for="o in orderList" :key="o.id">{{ o.name }}</li>
    </ul>
    <p v-if="!orderList.length">No products!</p> -->
    <!-- <order-list :orders="orders"></order-list> -->
    <order-list-sorter @order-remove="removeOrder" :orders="orders"></order-list-sorter>
  </div>
  </div>
</template>

<script>
import uuid from "uuid/v4";
import ProductList from "./components/ProductList";
import ProductAdd from "./components/ProductAdd";
import ProductListSort from "./components/ProductListSort";
import OrderList from "./components/OrderList";
import OrderListSorter from "./components/OrderListSorter";

import axios from "axios";
import store from '../store';

export default {
  name: "app",
  components: {
    ProductList,
    ProductAdd,
    ProductListSort,
    OrderList,
    OrderListSorter
  },
  data() {
    return {
      sharedState: store.state,
      products: [],
        // {
        //   id: 0,
        //   name: "Coffee"
        // },
        // {
        //   id: 1,
        //   name: "Pizza"
        // }
      orders: []
    };
  },
  methods: {
    removeLast() {
      this.products.pop();
    },
    removeItem(item) {
      var indexToRemove = this.orderList.indexOf(item);
      if (indexToRemove > -1) {
        this.orderList.splice(indexToRemove, 1);
      }
    },
    onAddProduct(product) {
      this.products.push(product);
    },
    onAddOrder(order) {
      this.orders.push(order);
    },
    onProductSearch(product) {
      store.showProduct(product)
    },
    removeOrder(order) {
      var indexToRemove = this.orders.indexOf(order);
      if (indexToRemove > -1) {
        this.orders.splice(indexToRemove, 1);
      }
    }
  },
  async created() {
    // this.products = await axios.get('products.json').then(res => res.data);
    // this.products = await axios.get('https://swapi.co/api/films').then(res => res.data.results);
    store.fetchProducts()
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
