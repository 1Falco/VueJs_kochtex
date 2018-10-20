<template>
<div>
  <form @submit.prevent="onSubmit()">
    <input
      name="product"
      v-model="newProduct.name"
      v-validate="'required|min:4'"
    >
    <button>Add</button>
    <div v-show="errors.has('product')">
      {{ errors.first('product') }}
    </div>
  </form>
    <br>
    <form @submit.prevent="onSearch()">
    <input
      v-model="searchingProduct.name"
    >
    <button>Search</button>
  </form>
</div>
  
</template>

<script>
import uuid from "uuid/v4";

export default {
  name: "ProductAdd",
  data() {
    return {
      newProduct: {
        name: ""
      },
      searchingProduct: {
        name: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }
        this.$emit("product-add", {
          id: uuid(),
          ...this.newProduct
        });
        this.newProduct.name = "";
        this.$validator.reset();
      });
    },
    onSearch() {
      this.$emit("search-product", {
        ...this.searchingProduct
      });
    }
  }
};
</script>

<style scoped>
</style>
