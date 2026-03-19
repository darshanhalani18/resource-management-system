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
  let adminEmail = "admin@example.com";

  try {
    const session = await decrypt(token);
    adminName = (session.userName as string) || "System Admin"; 
    adminEmail = (session.userEmail as string) || "admin@system.com";
  } catch (error) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar adminName={adminName} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar adminName={adminName} adminEmail={adminEmail} />
        <main className="flex-1 overflow-y-auto p-8 bg-[#f6f7f8]">
          {children}
        </main>
      </div>
    </div>
  );
}