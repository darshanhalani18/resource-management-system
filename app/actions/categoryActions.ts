"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";

const ORG_ID = 1;

export async function saveCategoryAction(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  await prisma.resource_categories.create({
    data: {
      name,
      description,
      organization_id: ORG_ID,
    },
  });

  revalidatePath("/admin/resource-categories");
}

export async function editCategoryAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  await prisma.resource_categories.update({
    where: { id },
    data: { name, description },
  });

  revalidatePath("/admin/resource-categories");
}

export async function deleteCategoryAction(id: number) {
  try {
    await prisma.resource_categories.delete({
      where: { id },
    });
    revalidatePath("/admin/resource-categories");
    return { success: true };
  } catch (error: any) {
    // P2003 is the Prisma error code for foreign key constraints
    if (error.code === "P2003") {
      return {
        success: false,
        message:
          "Cannot delete this category because it is currently linked to existing resources.",
      };
    }
    return { success: false, message: "An unexpected error occurred." };
  }
}
