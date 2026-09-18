import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (ctx === null) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return ctx;
}
