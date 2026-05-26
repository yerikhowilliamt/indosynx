import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-svh justify-center items-center gap-6 p-6 md:p-10 bg-[linear-gradient(135deg,#f59e0b_0%,#fbbf24_18%,#ffffff_38%,#bef264_58%,#a3e635_72%,#34d399_88%,#22d3ee_100%)] backdrop-blur-xl">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-1 self-center font-medium"
        >
          <Image src="/logos/logo.svg" alt="Logo" width={20} height={20} />
          Indosynx
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
