import { authClient } from "@/lib/auth-client";

export async function getToken() {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Could not get authentication token");
  }

  return data.token;
}