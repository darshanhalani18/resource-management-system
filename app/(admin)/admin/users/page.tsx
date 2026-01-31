import React from "react";
import UsersTable from "./components/UsersTable";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/jwt";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    redirect("/login");
  }

  const session = await decrypt(sessionToken);
  const orgId = session.orgId as number;

  const users = await prisma.users.findMany({
    where: { organization_id: orgId },
    include: { roles: true },
    orderBy: { created_at: "desc" },
  });

  const roles = await prisma.roles.findMany();

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "ACTIVE").length,
    admins: users.filter((u) => u.roles.name.toUpperCase() === "ADMIN").length,
    new: users.filter(
      (u) =>
        u.created_at &&
        u.created_at > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    ).length,
  };

  return (
    <div className="flex flex-col gap-8 max-w-[1200px] mx-auto">
      <UsersTable initialData={users} roles={roles} stats={stats} />
    </div>
  );
}
