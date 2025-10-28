import { getUserSession } from "@/components/helpers/getUserSession.ts";
import Sidebar from "@/components/Shared/Sidebar";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getUserSession()
  
  if (!session) redirect("/login");
  return (
    <main className="min-h-dvh flex gap-4">
      <Sidebar />
      {children}
    </main>
  );
}
