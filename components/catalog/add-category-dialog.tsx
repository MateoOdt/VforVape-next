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
import { Input } from "@/components/ui/input"
import { CatalogContext } from "./catalog-provider"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod"

const categorySchema = z.object({
  name: z.string().min(1, "Le nom de la catégorie est requis"),
})

type CategoryFormValues = z.infer<typeof categorySchema>

export function AddCategoryDialog() {
  const { jwtToken } = useContext(CatalogContext)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      const response = await fetch(`${process.env.API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la catégorie")
      }

      toast({
        title: "Succès",
        description: "La catégorie a été ajoutée avec succès",
      })
      setOpen(false)
      form.reset()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de la catégorie",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Ajouter une catégorie
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter une catégorie</DialogTitle>
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
                    <Input placeholder="Nom de la catégorie" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">Ajouter</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 