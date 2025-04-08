"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { CatalogContext } from "./catalog-provider"
import { useContext } from "react"

interface CategoryOptionsProps {
  categoryId: string
  categoryName: string
}

export function CategoryOptions({ categoryId, categoryName }: CategoryOptionsProps) {
  const [open, setOpen] = useState(false)
  const [renameOpen, setRenameOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [newName, setNewName] = useState(categoryName)
  const { toast } = useToast()
  const { jwtToken } = useContext(CatalogContext)

  const handleRename = async () => {
    setRenameOpen(false);

    try {
      const response = await fetch(`${process.env.API_URL}/categories/${categoryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ name: newName }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors du renommage de la catégorie")
      }

      toast({
        title: "Succès",
        description: "La catégorie a été renommée avec succès",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du renommage de la catégorie",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    setDeleteOpen(false);

    try {
      const response = await fetch(`${process.env.API_URL}/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la catégorie")
      }

      toast({
        title: "Succès",
        description: "La catégorie a été supprimée avec succès",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de la catégorie",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-2">
          <div className="flex flex-col gap-1">
            <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={() => setRenameOpen(true)}
                >
                  <Pencil className="h-4 w-4" />
                  Renommer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Renommer la catégorie</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Nouveau nom"
                  />
                  <Button onClick={handleRename}>Renommer</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
              <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-red-600 hover:text-red-700"
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
                Supprimer
              </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Supprimer la catégorie</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <p>Êtes-vous sûr de vouloir supprimer cette catégorie ?</p>
                  <Button onClick={handleDelete}>Supprimer</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
} 