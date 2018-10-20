<!--10- 1. There's a <template> part -->
<template>
  <div id="app">
    <div class="col-sm-6 col-xs-6 col-md-6">
    <h2>My awesome list</h2>
    <ul>
      <li v-on:click="addToOrderList(p)" v-for="p in products" :key="p.id">{{ p.name }}</li>
    </ul>
    <p v-if="!products.length">No products!</p>
    <p>Click on objects to add them to your order list</p>
        <!-- 1. Vue gives as some nice syntax to cope with casual use cases -->
    <form @submit.prevent="onSubmit()">
      <!-- 2. Any Angular fan here? v-model makes a binding with given object -->
      <input name="product" v-model="newProduct.name" v-validate="'required|min:4'">
      <button>Add</button>
            <!--3- 2. errors are added by default when validation is initialized and have some useful methods -->
      <div v-show="errors.has('product')">
        {{ errors.first('product') }}
      </div>
    </form>
    <br>
    <button v-on:click="removeLast()">Remove last item</button>
  </div>
  <div class="col-sm-6 col-xs-6 col-md-6">
        <h2>My order list</h2>
    <ul>
      <li v-on:click="removeItem(o)" v-for="o in orderList" :key="o.id">{{ o.name }}</li>
    </ul>
    <p v-if="!orderList.length">No products!</p>
  </div>
  </div>
</template>

<!--21- 2. A <script> part -->
<script>
import uuid from "uuid/v4";

// 4. Now App is not mounted itself, we're just creating a component (more on that later - hold your horses!)
export default {
  name: "app",
  //11/ 5. Data can no longer be just an object to prevent accidental shared state
  data() {
    return {
      products: [
        {
          id: 0,
          name: "Coffee"
        },
        {
          id: 1,
          name: "Pizza"
        }
      ],
      //3/ 3. Here goes the definition
      newProduct: {
        name: ""
      },
      orderList: []
    };
  },
  methods: {
    removeLast() {
      this.products.pop();
    },
    onSubmit() {
      // 3. On the JS side we need to use yet another injected value called $validator to validate all the fields
      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }
        this.products.push({
          id: uuid(),
          ...this.newProduct
        });
        this.newProduct.name = "";
        // 4/ and reset validation state after adding a product
        this.$validator.reset();
      });
    },
    addToOrderList(event) {
      this.orderList.push({
        id: event.id,
        name: event.name
      });
      console.log(this.orderList)
    },
    removeItem(item) {
      var indexToRemove = this.orderList.indexOf(item);
      if (indexToRemove > -1) {
        this.orderList.splice(indexToRemove, 1);
      }
    },
    isNotInArray = () => {
      return
    }
  }
};
</script>

<!--9- 3. And <style> part -->
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
