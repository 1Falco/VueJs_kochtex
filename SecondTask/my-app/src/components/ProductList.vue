<template>
  <div>
    <ul>
      <li v-on:click="addToOrderList(p)" v-for="p in products" :key="p.id">{{ p.name }}</li>
    </ul>
    <p v-if="!products.length">No products!</p>
  </div>
</template>

<script>
import uuid from "uuid/v4";

export default {
  name: "ProductList",
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
    }
  }
};
</script>

<style scoped>
</style>
