"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateOrganizationAction(
  organizationId: number | string,
  formData: FormData,
) {
  const id = Number(organizationId);

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const country = formData.get("country") as string;
  const state = formData.get("state") as string;
  const city = formData.get("city") as string;

  try {
    const org = await prisma.organizations.findUnique({ where: { id } });
    if (!org) return { success: false, message: "Organization not found." };

    const updateData: any = {
      name,
      email,
      phone,
      address,
      country,
      state,
      city,
    };

    await prisma.organizations.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/settings/organization");
    return {
      success: true,
      message: "Organization settings updated successfully!",
    };
  } catch (error) {
    console.error("Update Org Error:", error);
    return {
      success: false,
      message: "Use a different email address. it is already taken.",
    };
  }
}
