'use client'

import { Loader2, Trash2 } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { ConfirmationDialog } from '@/components/confirmation-dialog'
import { deleteCarSpottings } from '@/http/delete-car-spotting'
import { customRevalidateTag } from '@/utils/next/revalidate-tag'

export function DeleteSpotting({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition()

  async function handleDeleteCarSpottings() {
    startTransition(async () => {
      try {
        await deleteCarSpottings(id)

        customRevalidateTag('api/car-spottings')
        toast.success('Car spotting excluído com sucesso!!')
      } catch (error) {
        toast.error('Erro ao excluir car spotting')
      }
    })
  }

  return (
    <ConfirmationDialog
      confirm="Excluir"
      cancel="Cancelar"
      title="Excluir Car Spottings"
      message="Tem a certeza que deseja excluir este Car Spottings? Essa é irreversível e não poderá ser desfeita."
      trigger={
        <div className="flex items-center justify-center rounded-md bg-red-500 py-2">
          {isPending ? (
            <Loader2 className="size-5 animate-spin text-white" />
          ) : (
            <Trash2 className="size-5 cursor-pointer text-white" />
          )}
        </div>
      }
      handle={handleDeleteCarSpottings}
      isLoading={isPending}
    />
  )
}
