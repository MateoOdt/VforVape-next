"use client"

import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import type { ProductFormValues } from "@/types/catalog"
import { productSchema } from "@/lib/validations/catalog"
import _ from 'lodash'
import { CatalogContext } from "./catalog-provider"
import { useDropzone } from "react-dropzone";

export function AddProductDialog() {
  const { jwtToken, postProduct, categories } = useContext(CatalogContext);

  console.log(categories);

  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: 0,
    },
  });

  const handleFileUpload = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(`${process.env.API_URL}/api/files/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("File uploaded successfully:", data.url);
      return data.url;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };
  
  const onSubmit = async (data: ProductFormValues) => {
    if (!image) {
      console.error('Veuillez sélectionner une image pour le produit.');
      return;
    }
  
    try {
      const uploadedImageUrl = await handleFileUpload(image);
  
      if (!uploadedImageUrl) {
        console.error("Image upload failed.");
        return;
      }
  
      if (!jwtToken) {
        console.error('Token manquant. Vous devez être connecté pour effectuer cette action.');
        return;
      }
  
      await postProduct({
        ...data,
        image: uploadedImageUrl,
      });
  
      setOpen(false);
      form.reset();
      console.log("Produit créé avec succès");
    } catch (error) {
      console.error('Erreur lors de la création du produit :', error);
    }
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Ajouter un produit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un produit</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom du produit" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input placeholder="Description du produit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {capitalizeFirstLetter(category.name)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Image</FormLabel>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed p-4 text-center ${
                  isDragActive ? "border-blue-500" : "border-gray-300"
                }`}
              >
                <input {...getInputProps()} />
                {image ? (
                  <p>Fichier sélectionné : {image.name}</p>
                ) : (
                  <p>
                    {isDragActive
                      ? "Déposez l'image ici..."
                      : "Glissez et déposez une image ici, ou cliquez pour sélectionner un fichier"}
                  </p>
                )}
              </div>
            </div>
            <Button className="w-full">
              Add Product
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}