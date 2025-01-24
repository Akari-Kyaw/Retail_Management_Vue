<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { ProductType } from '@/api/product/types';
import { Item, useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import AddProductView from './AddProductView.vue';
import { Edit2Icon, Minus, PlusIcon, Trash } from 'lucide-vue-next';
import { inject } from 'vue';

const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore);
// const { mutate } = deleteProduct.useMutation();


const props = defineProps<{
    product: ProductType;
    item: Item;
}>()

const openEditDialog = inject('openEditDialog') as (product: ProductType) => void
const deleteProduct = inject('deleteProduct') as (productId: string) => void

</script>
<template>
    <div class="flex items-center">
        <Button
            v-if="!cartStore.cartItems.find((item) => item.productId === props.product.productId) || cartStore.cartItems.find((item) => item.productId === props.product.productId)?.quantity === 0"
            class="bg-blue-200 text-black-300 hover:bg-gray-300" @click="cartStore.addToCart(props.product)"> ➕ Add To
            Cart</Button>
        <div v-else class="flex justify-evenly items-center">
            <span class="rounded-full px-2 font-semibold text-red-600 cursor-pointer hover:bg-gray-200 select-none"
                @click="cartStore.updateQuantity(props.product.productId, props?.item?.quantity - 1)">
                <Minus />
            </span>
            <span class="w-[30px] text-black text-center">{{ cartStore.cartItems.find((item) => item.productId ===
                props.product.productId)?.quantity }}</span>
            <span
                class="rounded-full align-middle px-2 font-semibold text-green-600 cursor-pointer hover:bg-gray-200 select-none"
                @click="cartStore.addToCart(props.product)">
                <PlusIcon />
            </span>
        </div>
        <Button class="bg-blue-200 ml-2 text-black-300 hover:bg-gray-300" @click="openEditDialog(props.product)">
            <Edit2Icon /> Edit
        </Button>
        <Button class="bg-red-600 ml-2 text-black-300 hover:bg-gray-200"
            @click="deleteProduct(props.product.productId)">
            <Trash /> Delete
        </Button>
    </div>

</template>