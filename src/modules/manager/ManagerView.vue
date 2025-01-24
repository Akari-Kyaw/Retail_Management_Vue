<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { fetchSale } from '@/api/sale/queries';
import { fetchTotal } from '@/api/sale/queries';
import type {
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import {
  createColumnHelper,
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { SaleType } from '@/api/sale/type';
import { h, ref } from 'vue';
import { cn, valueUpdater } from '@/lib/utils';
import { CaretSortIcon } from '@radix-icons/vue';
import { Input } from '@/components/ui/input';
import { computed } from 'vue';

const { data: sales, isFetching } = fetchSale.useQuery({ queryKey: ['getAllSale'] })
const { data: totals } = fetchTotal.useQuery({ queryKey: ['getTotal'] })
const columnHelper = createColumnHelper<SaleType>()
const columns = [
  columnHelper.display({
    id: 'no',
    header: 'No.',
    cell: ({ row }) => {
      const no = row.index + 1;
      return h('div', { class: 'text-right font-medium' }, no);
    },
  }),
  columnHelper.accessor('saleId', {
    enablePinning: true,
    header: 'Sale ID',
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('saleId')),
  }),
  columnHelper.accessor('productId', {
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Product ID', h(CaretSortIcon, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('productId')),
  }),
  columnHelper.accessor('qty', {
    enablePinning: true,
    header: 'Sale Quantity',
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('qty')),
  }),
  columnHelper.accessor('totalPrice', {
    enablePinning: true,
    header: 'Total Price',
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('totalPrice')),
  }),
  columnHelper.accessor('totalProfit', {
    enablePinning: true,
    header: 'Total Profit',
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('totalProfit')),
  }),
  columnHelper.accessor('created_at', {
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Created At', h(CaretSortIcon, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('created_at')),
  }),
]


const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})

const table = computed(() => isFetching ? useVueTable({
  data: sales.value ?? [],
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
  data: sales.value ?? [],
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
  <div class="flex justify-center mt-5 mb-5">
    <div class="bg-white-200 shadow-lg rounded-lg p-6 max-w-md w-full">
      <h1 class="text-center font-semibold text-2xl mb-4 text-sky-400">Sales Summary</h1>
      <div class="text-center font-semibold text-xl">
        <p class="mb-2">
          Total Profit: <span class="text-green-600">{{ totals?.totalProfit }}</span>
        </p>
        <p>
          Total Revenue: <span class="text-blue-600">{{ totals?.total }}</span>
        </p>
        <p v-if="sales">
          Total Sale: <span class="text-pink-600">{{ sales.length }}</span>
        </p>
        <p v-else>
          Total Sale: 0
        </p>
      </div>
    </div>
  </div>
  <div class="w-full">
    <div class="gap-2 items-center py-4">
      <Input class="max-w-sm" placeholder="Filter Product ID..."
        :model-value="table.getColumn('productId')?.getFilterValue() as string"
        @update:model-value=" table.getColumn('productId')?.setFilterValue($event)" />
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
</template>