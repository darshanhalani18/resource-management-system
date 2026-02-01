import React from "react";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/jwt";
import { prisma } from "@/app/lib/prisma";
import OrganizationForm from "./OrganizationForm";

export default async function OrgSettings() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  
  if (!token) return <div className="p-10">Session expired.</div>;
  
  const session = await decrypt(token);

  const user = await prisma.users.findUnique({
    where: { id: Number(session.userId) },
    include: { organizations: true },
  });

  if (!user || !user.organizations) {
    return <div className="p-10">Organization not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-[#0d141b]">Organization Settings</h1>
        <p className="text-slate-500 mt-2">Manage company identity and global preferences.</p>
      </div>

      <OrganizationForm organization={user.organizations} />
    </div>
  );
}