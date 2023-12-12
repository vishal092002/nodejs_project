import { headers } from "next/headers";
import { loginAction ,signupAction} from "./action";
import { LoginForm } from "@/components/LoginForm";

export default async function Page() {
  const csrfToken = headers().get('X-CSRF-Token') || 'missing';
  return (
    <>
    
<LoginForm loginAction={loginAction} loginAction2={signupAction}  csrfToken={csrfToken} />

    </>
  )
}
 