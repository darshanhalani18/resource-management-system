"use server";

import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "../lib/validations/auth";
import { encrypt } from "../lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function generateOrgCode(name: string) {
  const prefix = name.substring(0, 3).toUpperCase();
  const random = Math.floor(1000 + Math.random() * 9000);
  const suffix = Math.random().toString(36).substring(2, 4).toUpperCase();
  return `RMS-${random}-${suffix}`;
}

export async function registerOrganizationAction(
  prevState: any,
  formData: FormData,
) {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = RegisterSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      data: rawData,
    };
  }

  const data = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const orgCode = generateOrgCode(data.orgName);

    const result = await prisma.$transaction(async (tx) => {
      const org = await tx.organizations.create({
        data: {
          name: data.orgName,
          organization_code: orgCode,
          type: data.orgType,
          email: data.orgEmail,
          country: data.country || null,
          state: data.state || null,
          city: data.city || null,
          address: data.address || null,
        },
      });

      const adminRole = await tx.roles.findFirst({ where: { name: "ADMIN" } });
      if (!adminRole) throw new Error("ADMIN role missing.");

      await tx.users.create({
        data: {
          organization_id: org.id,
          role_id: adminRole.id,
          name: data.adminName,
          email: data.email,
          password_hash: hashedPassword,
          status: "ACTIVE",
        },
      });

      return { orgCode: org.organization_code, orgName: org.name };
    });

    return {
      success: true,
      orgCode: result.orgCode,
      orgName: result.orgName,
    };
  } catch (error: any) {
    if (error.code === "P2002")
      return { error: "Email or Organization already exists.", data: rawData };
    return { error: "Registration failed. Please try again.", data: rawData };
  }
}

export async function loginAction(prevState: any, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const orgCode = formData.get("orgCode") as string;

  const errors: Record<string, string[]> = {};
  if (!orgCode) errors.orgCode = ["Organization code is required"];
  if (!email) errors.email = ["Email is required"];
  if (!password) errors.password = ["Password is required"];

  if (Object.keys(errors).length > 0) {
    return { errors, data: rawData };
  }

  let redirectTo = "";

  try {
    const user = await prisma.users.findFirst({
      where: {
        email: email,
        organizations: {
          organization_code: orgCode,
        },
      },
      include: {
        roles: true,
        organizations: true,
      },
    });

    if (!user)
      return {
        error: "Invalid credentials or organization code.",
        data: rawData,
      };
    if (user.status === "INACTIVE")
      return { error: "Account deactivated. Contact Admin.", data: rawData };

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid)
      return { error: "Invalid email or password.", data: rawData };

    const session = await encrypt({
      userId: user.id,
      role: user.roles.name.toUpperCase(),
      orgId: user.organization_id,
      orgName: user.organizations.name,
    });

    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 2, // 2 hours
    });

    const role = user.roles.name.toUpperCase();
    if (role === "ADMIN") redirectTo = "/admin";
    else if (role === "MANAGER") redirectTo = "/manager";
    else redirectTo = "/dashboard";
  } catch (error: any) {
    console.error("Login Error:", error);
    return {
      error: "An unexpected error occurred during login.",
      data: rawData,
    };
  }

  if (redirectTo) {
    redirect(redirectTo);
  }
}
