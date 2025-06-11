'use client'

import { Loader2, Trash2 } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { ConfirmationDialog } from '@/components/confirmation-dialog'
import { deleteLocalConselho } from '@/http/delete-local-conselho'
import { customRevalidateTag } from '@/utils/next/revalidate-tag'

export function DeleteLocaisConselho({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition()

  async function handleDeleteLocalConselho() {
    startTransition(async () => {
      try {
        await deleteLocalConselho(id)

        customRevalidateTag('api/locais-concelho')
        toast.success('Local conselho excluído com sucesso!!')
      } catch (error) {
        toast.error('Erro ao excluir local conselho')
      }
    })
  }

  return (
    <ConfirmationDialog
      confirm="Excluir"
      cancel="Cancelar"
      title="Excluir local conselho"
      message="Tem a certeza que deseja excluir este local conselho? Essa é irreversível e não poderá ser desfeita."
      trigger={
        <div className="flex items-center justify-center rounded-md bg-red-500 py-2">
          {isPending ? (
            <Loader2 className="size-5 animate-spin text-white" />
          ) : (
            <Trash2 className="size-5 cursor-pointer text-white" />
          )}
        </div>
      }
      handle={handleDeleteLocalConselho}
      isLoading={isPending}
    />
  )
}
