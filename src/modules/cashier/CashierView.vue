<script setup>
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Button from '@/components/ui/button/Button.vue';
import { saveSale } from '@/api/sale/queries';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore);
const totalAmount = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.quantity * item.sellingPrice);
  }, 0);
})

const { mutate: save } = saveSale.useMutation();
const router = useRouter();

const checkout = () => {
  try {
    for (const item of cartItems.value) {

      const saleData = {
        productId: item.productId,
        qty: item.quantity,
        created_by: 'admin',
      };

      save(saleData);

      cartStore.clearCart();
      router.push('/')
    }


    toast({
      title: "Thank You For Shopping",
      duration: 700,
    });

  } catch (error) {
    console.error('Error during checkout:', error);
    toast({
      title: "There was an error processing your checkout. Please try again.",
      duration: 700,
    });
  }
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4 text-center text-sky-400">Cashier</h1>
    <div v-if="cartStore.cartItems.length === 0" class="flex items-center justify-center min-h-64">
      <div class="max-w-lg mx-auto p-6 bg-white shadow-2xl rounded-lg border mt-10">
        <p class="text-xl font-semibold text-center text-gray-800">
          <DotLottieVue class="h-200 w-200" autoplay loop
            src="https://lottie.host/9e84c01f-f0aa-486b-840b-8570544c92c8/bEyMqDD9Q7.lottie"></DotLottieVue>
          Purchase Product First
        </p>
      </div>
    </div>
    <Table v-else>
      <TableCaption>Your Cart Items</TableCaption>
      <TableHeader class="bg-gray-200">
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in cartItems" :key="item.productId">
          <TableCell>{{ item.name }}</TableCell>
          <TableCell>{{ item.quantity }}</TableCell>
          <TableCell>{{ item.sellingPrice }}</TableCell>
          <TableCell>{{ item.quantity * item.sellingPrice }}</TableCell>
        </TableRow>
      </TableBody>
      <RouterLink to="/cart">
        <div class="absolute left-30 ml-3 flex items-center">
          <Button class="bg-blue-200 text-black-300 hover:bg-gray-300"> Back To Cart</Button>

        </div>
      </RouterLink>
      <div class="absolute right-10 flex items-center ">
        <Button class="bg-blue-200 text-black-300 hover:bg-gray-300" @click="checkout"> Check Out</Button>
      </div> <br>
    </Table>
    <div class="mt-5  text-center text-2xl ">
      Total Amount:<strong class="text-red-500"> {{ totalAmount }}</strong>
    </div>
  </div>
</template>