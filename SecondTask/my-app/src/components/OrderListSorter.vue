<template>
  <div>
    <ul>
      <li v-on:click="removeObject(o)" v-for="o in orders" :key="o.id">{{ o.name }}</li>
    </ul>
    <p v-if="!orders.length">No products!</p>
    <button v-on:click="sortList(orders)">Sort Orders</button>
  </div>
</template>

<script>
import uuid from "uuid/v4";

export default {
  name: "OrderListSorter",
  props: {
    orders: {
      type: Array
    }
  },
  methods: {
    removeObject(order) {
      // this.$emit("order-remove", {
      //   id: uuid(),
      //   name: order.name
      // });
      this.$emit("order-remove", 
        order
      );
    },
    sortList(orders) {
      return orders.sort((a, b) => {
        return this.compare(a, b, true);
      });
    },
    compare(a, b, isAsc) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
};
</script>

<style scoped>
</style>
