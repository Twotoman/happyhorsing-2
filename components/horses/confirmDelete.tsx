'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import { deleteHorseAction } from '@/lib/actions/horses'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  horseId: string
  userId: string
}

export function ConfirmDelete({
  open,
  onOpenChange,
  horseId,
  userId,
}: Props) {
  const [isPending, startTransition] = useTransition()

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        const res = await deleteHorseAction(horseId, userId)

        if (res?.success) {
          toast.success('Pferd gelöscht')
          onOpenChange(false)
        } else {
          toast(res?.error ?? 'Unbekannter Fehler')
        }
      } catch {
        toast('Löschen fehlgeschlagen')
      }
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Pferd wirklich löschen?</AlertDialogTitle>
          <AlertDialogDescription>
            Diese Aktion kann nicht rückgängig gemacht werden.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            Abbrechen
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? 'Löschen…' : 'Löschen'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

