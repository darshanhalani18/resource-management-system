import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import UserInfoModal from "../../components/UserInfoModal";

export default async function UserInfoSlot({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  if (isNaN(id)) return notFound();

  const user = await prisma.users.findUnique({
    where: { id },
    include: {
      roles: true,
      organizations: true,
    },
  });

  if (!user) return notFound();

  return <UserInfoModal user={user} />;
}
