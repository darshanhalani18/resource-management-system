import React from "react";
import CategoriesTable from "./components/CategoriesTable";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/jwt";
import { redirect } from "next/navigation";

export default async function ResourceCategoriesPage() {
  // 1. Get the session cookie
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  // 2. Validate session and decrypt orgId
  if (!sessionToken) {
    redirect("/login");
  }

  const session = await decrypt(sessionToken);
  const orgId = session.orgId as number;

  const categories = await prisma.resource_categories.findMany({
    where: { organization_id: orgId }, // Filtered by session!
    include: { _count: { select: { resources: true } } },
    orderBy: { created_at: "desc" },
  });

  // 4. Calculate Stats based on isolated data
  const totalCategories = categories.length;
  const linkedResources = categories.reduce(
    (acc, cat) => acc + cat._count.resources,
    0,
  );
  const newThisMonth = categories.filter(
    (c) =>
      c.created_at &&
      c.created_at > new Date(new Date().setMonth(new Date().getMonth() - 1)),
  ).length;

  return (
    <div className="flex flex-col gap-8 max-w-[1200px] mx-auto">
      <CategoriesTable
        initialData={categories}
        stats={{
          total: totalCategories,
          linked: linkedResources,
          new: newThisMonth,
        }}
      />
    </div>
  );
}
