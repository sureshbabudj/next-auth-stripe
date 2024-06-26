"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DashboardPageHeaderAction } from "../components/DashboardPageHeaderActionMenu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import Uploader from "@/app/ui/uploader";
import { FileUpIcon } from "lucide-react";
import { createProduct } from "@/app/lib/product.actions";
import { productSchema } from "@/app/zod/schema";
import { useState } from "react";

export function ProductPageHeaderAction() {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      images: undefined,
      price: undefined,
      videos: "",
    },
  });

  const [open, setOpen] = useState(false);

  async function onSubmit(values: z.infer<typeof productSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "images" && Array.isArray(value)) {
        value.forEach((val: File) => {
          formData.append("images[]", val);
        });
      } else {
        formData.append(key, value as any);
      }
    });
    const result = await createProduct(formData);
    if (result.err) {
      toast({
        title: result.err,
      });
    } else {
      toast({
        title: "You created the product containing values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(result.product!, null, 2)}
            </code>
          </pre>
        ),
      });

      setOpen(false);
    }
  }

  return (
    <DashboardPageHeaderAction>
      <Sheet
        open={open}
        onOpenChange={() => {
          setOpen(!open);
          form.reset();
        }}
      >
        <SheetTrigger asChild>
          <button className="text-sm dark:text-white bg-pink-600 px-4 py-2 rounded text-white">
            Create Product
          </button>
        </SheetTrigger>
        <SheetContent className=" lg:w-3/4 h-full overflow-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col h-full"
            >
              <SheetHeader>
                <SheetTitle>Create Product</SheetTitle>
                <SheetDescription>
                  Please fill in the details of the product you want to create.
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-4 my-1 flex-grow overflow-auto px-2 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Product Name here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.name?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Product Category"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.category?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter Product Description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.description?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <Uploader
                  setValue={(value) => form.setValue("images", value)}
                  control={form.control}
                  className="flex flex-row items-center text-primary space-x-2"
                >
                  <FileUpIcon />
                  <span>Add Product Images</span>
                </Uploader>

                <FormField
                  control={form.control}
                  name="videos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Videos</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Video URLs (comma separated)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.videos?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Product price"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.price?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <SheetFooter className="border-t">
                <div className="mt-4">
                  <Button type="submit">Save changes</Button>
                </div>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </DashboardPageHeaderAction>
  );
}
