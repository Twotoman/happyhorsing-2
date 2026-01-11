// app/horses/page.tsx
import { HorseCard } from "@/components/horses/HorseCard";
import { AddHorseSheet } from "@/components/horses/AddHorseSheet";
import { getHorseCards } from "@/lib/db/horses";
import { auth } from "@/auth/auth";
import { redirect } from "next/navigation" 
import { Plus } from "lucide-react";

export default async function HorsesPage() {
  
  const session = await auth();
  if (!session?.user) redirect("/login")

  //Lese die Pferde des angemeldeten Benutzers aus der Datenbank
  const horses = await getHorseCards(session.user.id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-xl font-bold">Meine Pferde</h1>
           {/*<p>Aktuell {horses.length} Pferde</p>*/}
        </div>

        {/* Button to trigger horse sheet with form */}
        <AddHorseSheet userId={session.user.id}>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl flex items-center gap-2">
            <Plus size={18} />
            Pferd hinzufügen
          </button>
        </AddHorseSheet>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        {horses.map((horse) => (
          <HorseCard key={horse.id} horse={horse} />
        ))}

        {/* Empty Card to trigger horse sheet with form  */}
        {/*//TODO: Design überprüfen und in eigene Komponente auslagern*/}
        <AddHorseSheet userId={session.user.id}>
          <div className="group border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer min-h-[300px]">
             <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                <Plus size={24} />
             </div>
             <p className="mt-4 font-medium text-slate-500 group-hover:text-blue-600">
               Neues Pferd registrieren
             </p>
          </div>
        </AddHorseSheet>
      </div>
    </div>
  );
}