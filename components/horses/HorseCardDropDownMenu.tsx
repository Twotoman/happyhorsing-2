'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { deleteHorseAction } from '@/lib/actions/horses'
import { ChevronDown} from 'lucide-react'
import { MoreVertical} from "lucide-react";
import { toast } from 'sonner'

type HorseCardDropDownMenuProps = {
  id: string
  userId: string
}

export default function  HorseCardDropDownMenu({ id, userId }: HorseCardDropDownMenuProps) {


  const handleDelete = async () => {
    if (!confirm('Pferd wirklich löschen?')) return
    const res = await deleteHorseAction(id, userId)

    if (res.success) {
      toast.success('Pferd gelöscht')
    } else {
      toast.error(res.error ?? 'Unbekannter Fehler')
    }
  }

  const handleEdit = async () => {
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <button type="button" aria-label="Mehr Optionen" className="text-muted-foreground hover:text-foreground">
            <MoreVertical size={18} />
            {/*<ChevronDown className="h-4 w-4 text-muted-foreground" />*/}
          </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">

        <DropdownMenuItem onClick={handleDelete}>
          Löschen
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleEdit}>
          Editieren
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}