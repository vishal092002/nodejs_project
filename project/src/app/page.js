import { headers } from "next/headers";
import { loginAction } from "./action";
import { LoginForm } from "@/components/LoginForm";

export default async function Page() {
  const csrfToken = headers().get('X-CSRF-Token') || 'missing';
  return (
    <>
    
<LoginForm loginAction={loginAction} csrfToken={csrfToken} />

    </>
  )
}
 