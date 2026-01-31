"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";

const ORG_ID = 1;

export async function saveUserAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role_id = Number(formData.get("role_id"));
  const password = "Password123";

  try {
    await prisma.users.create({
      data: {
        name,
        email,
        role_id,
        organization_id: ORG_ID,
        password_hash: password,
        status: "ACTIVE",
      },
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "Email already exists or database error.",
    };
  }
}

export async function editUserAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role_id = Number(formData.get("role_id"));
  const status = formData.get("status") as any;

  await prisma.users.update({
    where: { id },
    data: { name, email, role_id, status },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

export async function deleteUserAction(id: number) {
  try {
    await prisma.users.delete({ where: { id } });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    if (error.code === "P2003") {
      return {
        success: false,
        message: "User has active logs or bookings and cannot be deleted.",
      };
    }
    return { success: false, message: "Delete failed." };
  }
}
