'use client'

import { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, LogOut, User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { logout } from '@/lib/actions/auth'
import { useRouter } from 'next/navigation'

export default function UserMenu() {
  const { data: session } = useSession()
  const router = useRouter()

  const [user, setUser] = useState<{ email: string; name?: string } | null>(null)

  useEffect(() => {
    if (session?.user) {
      setUser({
        email: session.user.email ?? '',
        name:
          session.user.name ||
          session.user.email?.split('@')[0] ||
          'Benutzer',
      })
    }
  }, [session])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full p-2 hover:bg-muted">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <User className="h-5 w-5" />
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="space-y-1">
          <p className="text-sm font-medium">
            {user?.name ?? '...'}
          </p>
          <p className="text-xs text-muted-foreground">
            {user?.email ?? '...'}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push('/account')}>
          Account preferences
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push('/features')}>
          Feature previews
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logout}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

