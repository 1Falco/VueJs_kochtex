<template>
  <div>
    <ul>
      <li v-on:click="addToOrderList(p)" v-for="p in products" :key="p.id">{{ p.name }}</li>
    </ul>
    <p v-if="!products.length">No products!</p>
    <button v-on:click="sortList(products)">Sort Orders</button>
  </div>
</template>

<script>
import uuid from "uuid/v4";

export default {
  name: "ProductListSort",
  props: {
    products: {
      type: Array
    }
  },
  methods: {
    addToOrderList(event) {
      this.$emit("order-add", {
        id: uuid(),
        name: event.name
      });
    },
    sortList(products) {
      console.log(products);
    }
  }
};
</script>

<style scoped>
</style>
