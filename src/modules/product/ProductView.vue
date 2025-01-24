<script setup lang="ts">
import { deleteProduct, fetchProducts } from '@/api/product/quries';
import { ProductType } from '@/api/product/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { computed, h, provide, ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import Button from '@/components/ui/button/Button.vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
import AddProductView from './AddProductView.vue';
import { toast } from '@/components/ui/toast';
import {
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { cn, valueUpdater } from '@/lib/utils';
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'
import { Input } from '@/components/ui/input';
import { ArrowUpDown } from 'lucide-vue-next';
import ProductAction from './ProductAction.vue';
import { watch } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';

const { data: products, isFetching } = fetchProducts.useQuery({ queryKey: ['getAllProducts'] });

console.log(products.value);
const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore)
const pageData = ref({});
const isEdit = ref(false);
const isOpen = ref(false);
const selectedProduct = ref<ProductType | undefined>(undefined);
const queryClient = useQueryClient();
const { mutate: del } = deleteProduct.useMutation({
  onError: () => {
    toast({
      title: 'Failed to delete product. Please try again.',
      variant: 'destructive',
      duration: 1000,
    });
  },
  onSuccess: () => {
    toast({
      title: 'Product deleted successfully!',
      duration: 1000,
    });
    queryClient.invalidateQueries({
      queryKey: ['getAllProducts'],
    });
  },
});
const openEditDialog = (product: any) => {
  isOpen.value = true;
  selectedProduct.value = product;
  isEdit.value = true;
};


const cartItemCount = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0);
});



const addToCart = (product: ProductType) => {
  const quantityToAdd = cartItems.value.find(item => item.productId === product.productId);
  if (product.remainingStock === 0) {
    toast({
      title: "Product is Out of stock",
      variant: "destructive",
      duration: 700,
    });
    return;
  }
  if (quantityToAdd) {


    if (quantityToAdd.quantity < product.remainingStock) {
      quantityToAdd.quantity += 1;

    } else {
      toast({
        title: "Not enough stock available.",
        variant: "destructive",
        duration: 700,
      });
      return;
    }

  }
  else {
    cartItems.value.push({ ...product, quantity: 1 });
  };
  toast({
    title: "Add to Cart Successful",
    duration: 700,
  });
}

const removeFromCart = (product: ProductType) => {
  cartStore.removeFromCart(product.productId);
  toast({
    title: "Remove successfully",
    variant: "destructive",
    duration: 700,
  });
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

const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: 'No',
    header: () => h('div', { class: 'text-center' }, 'No.'),
    cell: ({ row }) => {
      const id = Number.parseInt(row.id) + 1

      return h('div', { class: 'text-center font-medium' }, id)
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        class: 'text-left',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => {
      const name = (row.getValue('name') as string).toUpperCase()

      return h('div', { class: 'text-right font-medium' }, name)
    },
  },
  {
    accessorKey: 'remainingStock',
    header: () => h('div', { class: 'text-center' }, 'Remaining Stock'),
    cell: ({ row }) => {
      const remainingStock = row.getValue('remainingStock') as string

      return h('div', { class: 'text-right font-medium' }, remainingStock)
    },
  },
  {
    accessorKey: 'sellingPrice',
    header: () => h('div', { class: 'text-right' }, 'Selling Price'),
    cell: ({ row }) => {
      const sellingPrice = Number.parseFloat(row.getValue('sellingPrice'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(sellingPrice)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  },
  {
    accessorKey: 'profit',
    header: () => h('div', { class: 'text-right' }, 'Profit'),
    cell: ({ row }) => {
      const profit = Number.parseFloat(row.getValue('profit'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(profit)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  },
  {
    accessorKey: "action",
    header: () => h("div", { class: "text-center font-medium" }, "Action"),
    cell: ({ row }) => {
      return h(ProductAction, { product: row.original, item: cartItems.value.find((item) => item.productId === row.original.productId)! });
    },
  },

]
provide('openEditDialog', openEditDialog);
provide('deleteProduct', del);

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})

watch(products, (newProducts) => {
  console.log(newProducts);
});

const table = computed(() => isFetching ? useVueTable({
  data: products.value ?? [],
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
    get expanded() { return expanded.value },
  }
}) : useVueTable({
  data: products.value ?? [],
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
    get expanded() { return expanded.value },
  }
}))
</script>

<template>



  <div class="relative mb-4">
    <h1 class="text-2xl font-bold mb-4 mt-2 text-center text-sky-400">Shopping Product</h1>
    <div>
      <AddProductView :isEdit="isEdit" :isOpen="isOpen" :product="selectedProduct" :closeDialog="closeDialog" />
      <Button class="bg-blue-200 text-black-300 hover:bg-gray-300 ml-3" @click="openAddDialog">
        Add Product
      </Button>
    </div>

    <div class="absolute top-10 right-10 flex items-center mb-5">
      <RouterLink to="/cart">
        <DotLottieVue class="h-12 w-15" autoplay loop
          src="https://lottie.host/91251c9c-10f5-41e4-bce0-ffc09e1d8d43/GsWuDqIcbd.lottie"></DotLottieVue>

        <span
          class="absolute top-0 right-5 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-pink-500 rounded-full">
          {{ cartItemCount }}
        </span>
      </RouterLink>
    </div> <br>
    <div class="mt-6 ml-1">

      <div v-if="isFetching" class="text-center">Loading Product...</div>
      <div v-else class="w-full">
        <div class="gap-2 caitems-center py-4">
          <Input class="max-w-sm" placeholder="Filter Product Name..."
            :model-value="table.getColumn('name')?.getFilterValue() as string"
            @update:model-value=" table.getColumn('name')?.setFilterValue($event)" />
          <div class="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                  <TableHead v-for="header in headerGroup.headers" :key="header.id"
                    :data-pinned="header.column.getIsPinned()" :class="cn(
                      { 'sticky bg-background/95': header.column.getIsPinned() },
                      header.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
                    )">
                    <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                      :props="header.getContext()" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <template v-if="table.getRowModel().rows?.length">
                  <template v-for="row in table.getRowModel().rows" :key="row.id">
                    <TableRow :data-state="row.getIsSelected() && 'selected'">
                      <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id"
                        :data-pinned="cell.column.getIsPinned()" :class="cn(
                          { 'sticky bg-background/95': cell.column.getIsPinned() },
                          cell.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
                        )">
                        <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                      </TableCell>
                    </TableRow>
                    <TableRow v-if="row.getIsExpanded()">
                      <TableCell :colspan="row.getAllCells().length">
                        {{ JSON.stringify(row.original) }}
                      </TableCell>
                    </TableRow>
                  </template>
                </template>

                <TableRow v-else>
                  <TableCell :colspan="columns.length" class="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div class="flex items-center justify-end space-x-2 py-4">

            <div class="space-x-2">
              <Button variant="outline" size="sm" :disabled="!table.getCanPreviousPage()" @click="table.previousPage()">
                Previous
              </Button>
              <span class="mx-4">
                Page {{ table.getState().pagination.pageIndex + 1 }} of {{ table.getPageCount() }}
              </span>
              <Button variant="outline" size="sm" :disabled="!table.getCanNextPage()" @click="table.nextPage()">
                Next
              </Button>
            </div>

          </div>
        </div>
      </div>


    </div>

  </div>

</template>