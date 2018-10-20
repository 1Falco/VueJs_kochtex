<template>
  <div>
    <ul>
      <li v-for="o in orders" :key="o.id">{{ o.name }}</li>
    </ul>
    <p v-if="!orders.length">No products!</p>
  </div>
</template>

<script>
import uuid from "uuid/v4";

export default {
  name: "OrderList",
  props: {
    orders: {
      type: Array
    }
  },
  methods: {
    // addToOrderList(event) {
    //   this.$emit("order-add", {
    //     id: uuid(),
    //     name: event.name
    //   });
    // }
  }
};
</script>

<style scoped>
</style>
