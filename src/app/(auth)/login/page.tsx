import LoginForm from "@/components/auth/login-form";
import { requireUnauth } from "@/lib/auth-utils";
import Image from "next/image";
import Link from "next/link";

const LoginPage = async () => {
  await requireUnauth();
  return <LoginForm />;
};

export default LoginPage;
