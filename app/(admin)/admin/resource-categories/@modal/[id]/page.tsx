
import { notFound } from "next/navigation";
import CategoryDetailModal from "../../components/CategoryDetailModal";
import { prisma } from "@/app/lib/prisma";

export default async function CategoryDetailSlot({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);


  if (isNaN(id)) {
    return notFound();
  }

  const category = await prisma.resource_categories.findUnique({
    where: { id: id },
  });

  if (!category) {
    return notFound();
  }
  
  return <CategoryDetailModal category={category} />;
}