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
import { addProduct } from '@/api/product/quries';
import ProductView from './ProductView.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isOpen = ref(false);
const router = useRouter();
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
)
const form = useForm({
    validationSchema: formSchema,
    initialValues: {
        name: '',
        remainingStock: 0,
        sellingPrice:0,
        profit:0,
        createdBy:''
    }
})
const { mutate: save } = addProduct.useMutation();
const onSubmit = form.handleSubmit(async (values) => {
    try {

        console.log('Form Values:', values);

        await save(values);

        alert('Product added successfully!')
        form.resetForm();
       isOpen.value = false;
    } catch (error) {
        alert('Failed to add product. Please try again.');
       
    }
});






</script>
<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger>
            <slot></slot>
        </DialogTrigger>
        <DialogContent
            class="w-[95vw] sm:w-[400px] max-w-[400px]"
        >
            <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <form @submit="onSubmit" class="gap-3">
                    <FormField v-slot="{ componentField }" name="name">
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl class="">
                                <Input
                                    type="text"
                                    placeholder="Enter Name..."
                                    v-bind="componentField"
                                    aria-label="name form field"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="remainingStock">
                        <FormItem>
                            <FormLabel>Remaining Stock</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter stock..."
                                    v-bind="componentField"
                                    aria-label="stock form field"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="sellingPrice">
                        <FormItem>
                            <FormLabel>Selling Price</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter price..."
                                    v-bind="componentField"
                                    aria-label="price form field"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="profit">
                        <FormItem>
                            <FormLabel>Profit</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter profit..."
                                    v-bind="componentField"
                                    aria-label="profit form field"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="createdBy">
                        <FormItem>
                            <FormLabel>createdBy</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter name..."
                                    v-bind="componentField"
                                    aria-label="createdby form field"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                   
                    <div class="mt-3 flex justify-center items-center gap-2">
                        <DialogClose class="w-[120px]">
                            <Button
                                type="button"
                                class="w-full bg-destructive hover:bg-destructive/80"
                                >Cancel</Button
                            >
                        </DialogClose>
                        <Button class="w-[120px]" type="submit">Submit</Button>
                    </div>
                </form>
            </DialogHeader>
            <AddProductView/>
        </DialogContent>
    </Dialog>
</template>
