import React from "react";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/jwt";
import { prisma } from "@/app/lib/prisma";
import ProfileForm from "./ProfileForm";

export default async function MyProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const session = await decrypt(token!);

  const user = await prisma.users.findUnique({
    where: { id: session.userId as string },
    include: { roles: true, organizations: true },
  });

  if (!user) return <div className="p-10">Session expired.</div>;

  const joinedDate = new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
  }).format(new Date(user.created_at));

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl overflow-hidden">
        <ProfileForm user={user} joinedDate={joinedDate} />
      </div>
    </div>
  );
}
