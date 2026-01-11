'use client'

import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deleteHorseAction } from '@/lib/actions/horses'
import { MoreVertical } from 'lucide-react'
import { toast } from 'sonner'
import { useTransition } from 'react'
import {ConfirmDelete} from './confirmDelete'

type HorseCardDropDownMenuProps = {
  id: string
  userId: string
}

export default function HorseCardDropDownMenu({ id, userId }: HorseCardDropDownMenuProps) {
  const [openDelete, setOpenDelete] = useState(false)

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Mehr Optionen"
            className="text-muted-foreground hover:text-foreground"
          >
            <MoreVertical size={18} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setOpenDelete(true)}>
            Löschen
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={() => alert('Edit noch offen')}>
            Editieren
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDelete
        open={openDelete}
        onOpenChange={setOpenDelete}
        horseId={id}
        userId={userId}
      />
    </>
  )
}
