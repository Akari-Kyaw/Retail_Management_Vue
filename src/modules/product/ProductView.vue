<script setup lang="ts">
import { deleteProduct, editProduct, fetchProducts } from '@/api/product/quries';
import { ProductType } from '@/api/product/types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { computed,  ref, watch } from 'vue';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import Button from '@/components/ui/button/Button.vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
import AddProductView from './AddProductView.vue';
import { Pagination, PaginationList, PaginationListItem } from '@/components/ui/pagination';
import PaginationFirst from '@/components/ui/pagination/PaginationFirst.vue';
import PaginationPrev from '@/components/ui/pagination/PaginationPrev.vue';
import PaginationNext from '@/components/ui/pagination/PaginationNext.vue';
import PaginationLast from '@/components/ui/pagination/PaginationLast.vue';
import { toast } from '@/components/ui/toast';
import { ShoppingBagIcon } from 'lucide-vue-next';

const {data:products}=fetchProducts.useQuery()
const cartStore = useCartStore(); 
const{cartItems}=storeToRefs(cartStore)
const pageData = ref({});
const isEdit = ref(false);
const isOpen = ref(false);
const selectedProduct = ref<ProductType | undefined>(undefined);
const { mutate: del } = deleteProduct.useMutation();
const openEditDialog = (product: any) => {
  isOpen.value = true;
  selectedProduct.value = product;
  isEdit.value = true;
};
// const delete = async ()=>{
//   try {

// const id=products.value.
// await del(products.value.);

// alert('Product added successfully!')
// } catch (error) {
// alert('Failed to add product. Please try again.');
// }
 
       
    
// };
const cartItemCount = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.quantity, 0);
    });

// const addToCart = (product: ProductType) => {
//   const stock=cartStore.updateQuantity  ;
//   console.log(product)
//   cartStore.addToCart(product);
//    console.log(cartStore.cartItems); 
// };

const addToCart = (product: ProductType) => {
  const quantityToAdd = cartItems.value.find(item=>item.productId===product.productId) ; 
if(product.remainingStock===0){
  toast({
    title: "Product is Out of stock",
    variant: "destructive",
    duration:700,
  });
  return;
}
  if(quantityToAdd){
   
   
    if (quantityToAdd.quantity < product.remainingStock) {
   quantityToAdd.quantity+=1; 
   
  } else {
  toast({
    title: "Not enough stock available.",
    variant: "destructive",
    duration:700,
  });
  return;
  }
 
  }
  else {
    cartItems.value.push({ ...product, quantity: 1 });
};
toast({
    title: "Add to Cart Successful",
    duration:700,
  });}

const removeFromCart = (product: ProductType) => {
  cartStore.removeFromCart(product.productId); 
  toast({
    title: "Remove successfully",
    variant: "destructive",
    duration:700,
  });
};

const currentPage=ref(1);
const itemsPerPage=10;

const paginatedData = computed(() => {
  pageData.value = products?.value ?? [];
  console.log(products.value);
  console.log(pageData.value);

  if (!Array.isArray(products.value)) return [];
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  console.log(products.value.slice(start, end))
  return products.value.slice(start, end);

});
const totalPages = computed(() => {
  const totalpagedata = products.value || [];
  return Array.isArray(products.value)
    ? Math.ceil(products.value.length / itemsPerPage)
    : 1;
});
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
watch(paginatedData, () => {
  console.log("Paginated data:", paginatedData.value);
});
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const openAddDialog = () => {
  isOpen.value = true;
  isEdit.value = false;
  selectedProduct.value = undefined;
};

const closeDialog = () => {
  isOpen.value = false;
  isEdit.value = false;
  selectedProduct.value = undefined;
};
</script>

<template>
 
   
   
  <div class="relative mb-4">
    <h1 class="text-2xl font-bold mb-4 mt-2 text-center text-sky-400">Shopping Product</h1>
    <div>
      <!-- <AddProductView>
        <Button class="bg-blue-200 text-black-300 hover:bg-gray-300 ml-3" >
          Add Product
        </Button>
      </AddProductView> -->
      <AddProductView :isEdit="isEdit" :isOpen="isOpen" :product="selectedProduct" :closeDialog="closeDialog" />
      <Button class="bg-blue-200 text-black-300 hover:bg-gray-300 ml-3" @click="openAddDialog">
        Add Product
      </Button>
    </div>
    
    <div class="absolute top-10 right-10 flex items-center mb-5">
      <RouterLink to="/cart">
        <DotLottieVue class="h-12 w-15" autoplay loop src="https://lottie.host/91251c9c-10f5-41e4-bce0-ffc09e1d8d43/GsWuDqIcbd.lottie"></DotLottieVue> 

      <ShoppingBagIcon></ShoppingBagIcon>
      <span class="absolute top-0 right-5 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-pink-500 rounded-full">
        {{ cartItemCount }}
      </span>
      </RouterLink>
    </div> <br>
    <div class="mt-6 ml-1">
    <Table >
    <TableCaption>Product Lists</TableCaption>
    <TableHeader class="bg-gray-200 font-semibold text-foreground ">
      <TableRow>
        <TableHead>
          No
        </TableHead>
        <TableHead>
          Name
        </TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Stock</TableHead>
        <TableHead>
          Profit
        </TableHead>
        <TableHead>Action</TableHead>

      </TableRow>
    </TableHeader>
    <TableBody >
      <TableRow v-for="(product, index) in paginatedData" :key="index" >
        
        <TableCell>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</TableCell>
        <TableCell class="font-medium ">
          {{ product.name }}
        </TableCell>
        <TableCell >{{ product.sellingPrice}}</TableCell>
        <TableCell>{{ product.remainingStock }}</TableCell>
        <TableCell>
          {{ product.profit }}
        </TableCell>
        <TableCell>
          <div class="flex space-x-4">
           
            <Button class="bg-blue-200 text-black-300 hover:bg-gray-300" @click="addToCart(product)  "  > ➕ Add To Cart</Button>
          <Button variant="destructive" class="hover:bg-gray-300 text-black-300" @click="removeFromCart(product)"> ✖️ Remove from Cart</Button>
          <Button class="bg-blue-200  hover:bg-gray-300 text-black-300" @click="openEditDialog(product)">Edit Product</Button>
          <Button class="bg-blue-200  hover:bg-gray-300 text-black-300" @click="del(product.productId)">Delete Product</Button>
         </div>

        </TableCell>

      </TableRow>
    </TableBody>
  </Table> 
   <!-- Pagination -->
    <Pagination class="justify-items-end">
      <PaginationList class="flex items-center gap-1">
        <PaginationFirst @click="goToPage(1)" />
        <PaginationPrev @click="prevPage" />
        <template v-for="page in totalPages" :key="page">
          <PaginationListItem :value="page">
            <Button
              class="w-10 h-10 p-0"
              :variant="page === currentPage ? 'default' : 'outline'"
              @click="goToPage(page)"
            >
              {{ page }}
            </Button>
          </PaginationListItem>
        </template>
        <PaginationNext @click="nextPage" />
        <PaginationLast @click="goToPage(totalPages)" />
      </PaginationList>
    
    </Pagination>
  </div>
 
  </div>
  
</template>