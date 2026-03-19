"use server";

import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { randomBytes } from "crypto";
import { sendInviteEmail } from "@/app/lib/mail";

export async function inviteUserAction(data: { name: string; email: string; roleId: number; orgId: number }) {
  try {
    const validOrgId = Number(data.orgId);
    if (isNaN(validOrgId)) return { success: false, error: "Invalid Organization ID." };

    const existing = await prisma.users.findUnique({ where: { email: data.email } });
    if (existing) return { success: false, error: "Email already exists." };

    const tempPassword = randomBytes(4).toString("hex").toUpperCase(); 
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // 3. Create User
    const newUser = await prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: hashedPassword,
        organization_id: validOrgId,
        role_id: Number(data.roleId),
        status: "PENDING",
        temp_password: tempPassword,
        must_change_password: true,
      },
      include: { 
        organizations: true 
      }
    });

    const orgCode = newUser.organizations?.organization_code || "N/A";
    
    // 4. Send Email
    try {
      await sendInviteEmail(newUser.email, newUser.name, tempPassword, orgCode);
    } catch (mailError) {
      console.error("NOTIFICATION ERROR: Email failed.", mailError);
    }

    revalidatePath("/admin/users");
    
    return { 
      success: true, 
      data: { 
        name: newUser.name, 
        email: newUser.email, 
        tempPassword, 
        orgCode
      } 
    };
  } catch (e: any) {
    console.error("PRISMA ERROR:", e.message); 
    return { success: false, error: `Critical System Error: ${e.message}` };
  }
}

export async function resendInvitationAction(userId: number) {
  try {
    const newTempPassword = randomBytes(4).toString("hex").toUpperCase();
    const newHash = await bcrypt.hash(newTempPassword, 10);

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        password_hash: newHash,
        temp_password: newTempPassword,
        status: "PENDING"
      },
      include: { organizations: true }
    });

    const orgCode = updatedUser.organizations?.organization_code || "N/A";

    try {
      await sendInviteEmail(updatedUser.email, updatedUser.name, newTempPassword, orgCode);
    } catch (mailError) {
      console.error("RESEND MAIL ERROR:", mailError);
    }

    revalidatePath("/admin/users");
    return { success: true, tempPassword: newTempPassword };
  } catch (error: any) {
    console.error("RESEND ERROR:", error.message);
    return { success: false, message: "Failed to reset invitation." };
  }
}

export async function updateProfileAction(userId: number, formData: FormData) {
  const name = formData.get("name") as string;
  const oldPassword = formData.get("oldPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  try {
    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user) return { success: false, message: "User not found." };

    const updateData: any = { name };

    if (newPassword && newPassword.trim() !== "") {
      if (!oldPassword) return { success: false, message: "Current password is required." };

      const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
      if (!isMatch) return { success: false, message: "The current password entered is incorrect." };

      updateData.password_hash = await bcrypt.hash(newPassword, 10);
      updateData.must_change_password = false;
      updateData.temp_password = null;
    }

    await prisma.users.update({ where: { id: userId }, data: updateData });

    revalidatePath("/", "layout");
    return { success: true, message: "Profile updated successfully!" };
  } catch (error) {
    return { success: false, message: "Database update failed." };
  }
}

export async function deleteUserAction(userId: number, currentUserId: number) {
  if (userId === currentUserId) {
    return { success: false, message: "Security Error: You cannot delete your own account." };
  }

  try {
    await prisma.users.delete({ where: { id: userId } });
    revalidatePath("/admin/users");
    return { success: true, message: "User successfully removed." };
  } catch (error) {
    return { success: false, message: "Could not remove user." };
  }
}