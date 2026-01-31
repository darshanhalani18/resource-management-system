import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/jwt";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  
  if (!token) redirect("/login");

  let adminName = "System Admin";

  try {
    const session = await decrypt(token);
    adminName = (session.userName as string) || "System Admin"; 
  } catch (error) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar adminName={adminName} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar adminName={adminName} />
        <main className="flex-1 overflow-y-auto p-8 bg-[#f6f7f8]">
          {children}
        </main>
      </div>
    </div>
  );
}