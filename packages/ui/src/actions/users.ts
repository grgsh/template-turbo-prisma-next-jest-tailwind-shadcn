"use server";
import * as database from "@repo/database";

export async function getUsers(): Promise<database.User[]> {
  const delay = Math.floor(Math.random() * (5 - 1) + 1) * 1000;
  console.log(`Running with delay of ${delay.toFixed(0)}ms`);
  try {
    await new Promise<void>((res) => {
      setTimeout(res, delay);
    });
    return await database.prisma.user.findMany();
  } catch (e: unknown) {
    console.error(e);
    return [];
  }
}
