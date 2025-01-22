<script setup>
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod'
import { useForm } from 'vee-validate';
import { addProduct, editProduct } from '@/api/product/quries';
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from '@/components/ui/toast';

const formSchema = toTypedSchema(
    z.object({
        name: z
            .string({ required_error: ('error-msg.required') })
            .min(1, { message: ('error-msg.required') }),
        remainingStock: z
            .number({ required_error: ('error-msg.required') })
            .min(1, { message: ('error-msg.required') }),
        sellingPrice: z
            .number({ required_error: ('error-msg.required') })
            .min(1, { message: ('error-msg.required') }),
        profit: z
            .number({ required_error: ('error-msg.required') })
            .min(1, { message: ('error-msg.required') }),
        createdBy: z
            .string({ required_error: ('error-msg.required') })
            .min(1, { message: ('error-msg.required') }),

    })
);
const props = defineProps({
    isEdit: {
        type: Boolean,
        default: false,
    },
    isOpen: {
        type: Boolean,
        default: false,
    },
    product: {
        type: Object,
        default: () => ({}),
    },
    closeDialog: {
        type: Function,
        default: () => { },
    },
});
const form = useForm({
    validationSchema: formSchema,
    initialValues: {
        name: '',
        remainingStock: 0,
        sellingPrice: 0,
        profit: 0,
        createdBy: ''
    }
});

watch(() => props.isEdit, (product) => {
    if (props.isEdit && product) {
        form.setValues({
            name: props.product.name,
            remainingStock: props.product.remainingStock,
            sellingPrice: props.product.sellingPrice,
            profit: props.product.profit,
        });
    }
});

const { mutate: save } = addProduct.useMutation();
const { mutate: edit } = editProduct.useMutation();

//  const onSubmit = form.handleSubmit(async (values) => {
//      try {

//          console.log('Form Values:', values);

//          await save(values);

//          alert('Product added successfully!')
//          form.resetForm();
//         isOpen.value = false;
//      } catch (error) {
//          alert('Failed to add product. Please try again.');

//      }
const onSubmit = form.handleSubmit((values) => {
    if (props.isEdit) {
        edit({ productId: props.product.id, ...values });
        toast({
            title: 'Product updated successfully!',
        });
    } else {
        save(values);
        toast({
            title: 'Product added successfully!',
        });
    }
    form.resetForm();
    props.closeDialog();
});
// const { mutate: edit } = editProduct.useMutation();
// const onSubmit = form.handleSubmit(async(values) => {
//   try {
//     const payload = props.isEdit
//       ? {
//         productId: .product.id,
//         name: values.name,
//         stock: values.stock,
//         price: values.price,
//         profit: values.profitPerItem,
//       }
//       : {
//         name: values.name,
//         stock: values.stock,
//         price: values.price,
//         profit: values.profitPerItem,
//       };
//     }}
</script>
<template>
    <Dialog v-model:open="props.isOpen">
        <DialogTrigger>
            <slot></slot>
        </DialogTrigger>
        <DialogContent class="w-[95vw] sm:w-[400px] max-w-[400px]">
            <DialogHeader>
                <DialogTitle>{{ props.isEdit ? 'Edit Product' : 'Add New Product' }}</DialogTitle>
                <form @submit="onSubmit" class="gap-3">
                    <FormField v-slot="{ componentField }" name="name">
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl class="">
                                <Input type="text" placeholder="Enter Name..." v-bind="componentField"
                                    aria-label="name form field" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="remainingStock">
                        <FormItem>
                            <FormLabel>Remaining Stock</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter stock..." v-bind="componentField"
                                    aria-label="stock form field" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="sellingPrice">
                        <FormItem>
                            <FormLabel>Selling Price</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter price..." v-bind="componentField"
                                    aria-label="price form field" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="profit">
                        <FormItem>
                            <FormLabel>Profit</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter profit..." v-bind="componentField"
                                    aria-label="profit form field" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" v-if="!props.isEdit" name="createdBy">
                        <FormItem>
                            <FormLabel>Created By</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Enter name..." v-bind="componentField"
                                    aria-label="createdby form field" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" v-else name="updatedBy">
                        <FormItem>
                            <FormLabel>Updated By</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Enter name..." v-bind="componentField"
                                    aria-label="createdby form field" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <div class="mt-3 flex justify-center items-center gap-2">
                        <DialogClose>
                            <Button type="button" class="w-full bg-destructive hover:bg-destructive/80"
                                @click="props.closeDialog">Cancel</Button>
                        </DialogClose>
                        <Button class="w-[120px]" type="submit">Submit</Button>
                    </div>
                </form>
            </DialogHeader>
            <AddProductView />
        </DialogContent>
    </Dialog>
</template>
