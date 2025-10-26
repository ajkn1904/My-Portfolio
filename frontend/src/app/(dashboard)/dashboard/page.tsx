//import {authOptions} from "@/components/helpers/authOptions"
//import {getServerSession} from "next-auth"
import { getUserSession } from "@/components/helpers/getUserSession.ts";

export default async function DashboardHome() {
  //const session = await getServerSession(authOptions)
  const session = await getUserSession()

console.log("SESSION:", session);


  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 w-full">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Welcome, {session?.user?.name}!
      </h1>
      <p className="text-lg text-gray-600 italic text-center">{session?.user?.email}</p>
    </div>
  );
}
