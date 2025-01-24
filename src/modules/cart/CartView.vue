<script setup lang="ts">

import { computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
import { Minus, PlusIcon } from 'lucide-vue-next';

const cartStore = useCartStore();

const item = cartStore.cartItems;
console.log(item)

const getProductName = (productId: string) => {
  const product = item.find(p => p.productId === productId);
  return product ? product.name : 'Unknown Product';
};

const getProductPrice = (productId: string) => {
  const product = item?.find(p => p.productId === productId);
  return product ? product.sellingPrice : 0;
};

const getProductProfit = (productId: string) => {
  const product = item?.find(p => p.productId === productId);
  return product ? product.profit : 0;
};

const totalAmount = computed(() => {
  return item.reduce((total, item) => {
    return total + (item.quantity * getProductPrice(item.productId));
  }, 0);
});

const removeFromCart = (productId: string) => {
  cartStore.removeFromCart(productId);
};

const updateQuantity = (productId: string, quantity: number) => {
  const stock = item?.find(p => p.productId === productId)

  if (!stock) {
    return;
  }

  const remainingStock = stock.remainingStock
  if (quantity <= 0) {
    removeFromCart(productId);
  }
  else if (quantity <= remainingStock) {
    cartStore.updateQuantity(productId, quantity);

  }

  else {
    cartStore.updateQuantity(productId, remainingStock);
  }
};


</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4 text-center text-sky-400">Shopping Cart</h1>
    <div v-if="item.length === 0" class="flex items-center justify-center min-h-64">
      <div class="max-w-lg mx-auto p-6 bg-white shadow-2xl rounded-lg border a mt-10">
        <p class="text-xl font-semibold text-center text-gray-800">
          <DotLottieVue class="h-200 w-200" autoplay loop
            src="https://lottie.host/dc270f94-512e-4a19-bc4e-b5815f497fde/AehvCrQERz.lottie"></DotLottieVue>
          There are no items in your Cart
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
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

        <TableRow v-for="productInCart in item" :key="productInCart.productId">
          <TableCell>{{ getProductName(productInCart.productId) }}</TableCell>
          <TableCell>
            <div class="flex items-center">
              <Minus @click="updateQuantity(productInCart.productId, productInCart.quantity - 1)"
                :disabled="productInCart.quantity <= 1" />

              <span class="mx-2">{{ productInCart.quantity }}</span>
              <PlusIcon @click="updateQuantity(productInCart.productId, productInCart.quantity + 1)" />

            </div>
          </TableCell>
          <!-- <TableCell>{{ productInCart.quantity }}</TableCell> -->
          <TableCell>{{ getProductPrice(productInCart.productId) }}</TableCell>
          <TableCell>{{ productInCart.quantity * getProductPrice(productInCart.productId) }}</TableCell>
          <TableCell>
            <Button variant="destructive" class="text-black-300 hover:bg-gray-300"
              @click="removeFromCart(productInCart.productId)"> ✖️ Remove</Button>
          </TableCell>
        </TableRow>
      </TableBody>
      <div class="absolute top-50 right-10 flex items-center">
        <RouterLink to="/cashier">
          <Button class="bg-blue-200 text-black-300 hover:bg-gray-300">Cashier</Button>
        </RouterLink>
      </div> <br>

      <div class="absolute left-30 ">
        <strong>Total: {{ totalAmount }}</strong>
      </div> <br>
    </Table>
  </div>
</template>