'use client';

import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LogoutButton = () => {
    const router = useRouter()
    return ( 
        <Button onClick={() => authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                    toast.success("Logged out successfully");
                }
            }
        })} className="rounded-md cursor-pointer">Logout</Button>
     );
}
 
export default LogoutButton;