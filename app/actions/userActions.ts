"use server";

import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(userId: string, formData: FormData) {
  const name = formData.get("name") as string;
  const oldPassword = formData.get("oldPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  try {
    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user) return { success: false, message: "User not found." };

    const updateData: any = { name };

    if (newPassword && newPassword.trim() !== "") {
      if (!oldPassword)
        return { success: false, message: "Current password is required." };

      const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
      if (!isMatch)
        return {
          success: false,
          message: "The current password you entered is incorrect.",
        };

      updateData.password_hash = await bcrypt.hash(newPassword, 10);
    }

    await prisma.users.update({ where: { id: userId }, data: updateData });

    revalidatePath("/", "layout");
    return { success: true, message: "Profile updated successfully!" };
  } catch (error) {
    return { success: false, message: "Database update failed." };
  }
}

export async function deleteUserAction(userId: string, currentUserId: string) {
  if (userId === currentUserId) {
    return {
      success: false,
      message: "Security Error: You cannot delete your own account.",
    };
  }

  try {
    await prisma.users.delete({ where: { id: userId } });
    revalidatePath("/admin/users");
    return { success: true, message: "User successfully removed." };
  } catch (error) {
    return { success: false, message: "Could not remove user." };
  }
}
