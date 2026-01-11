import { getHorseByIdDB } from "@/lib/db/horses"
import { redirect } from "next/navigation" 
import { auth } from "@/auth/auth"

type PageProps = {
  params: {
    horseId: string
  }
}

export default async function HorsePage({ params }: PageProps) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/login')
  }
  
  const { horseId } = params
  const horse = await getHorseByIdDB(
    params.horseId,
    session.user.id
  )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Pferd Detailseite</h1>

      <p className="mt-4">
        <strong>Pferde-ID:</strong> {horse?.id? horse.id : 'Nicht gefunden'}
      </p>

      <p className="mt-2 text-muted-foreground">
        (Testseite – später kommt der Pferdename aus der DB)
      </p>
    </div>
  )
}