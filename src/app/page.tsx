import { getServerAuthSession} from "@/server/auth";
import SignInButton from "./ui/auth/SignInButton";
import SignOutButton from "./ui/auth/SignOutButton";
function SignIn() {

  
  return (
    <SignInButton />
  );
}



export default async function Page() {
  const session = await getServerAuthSession();
  const user = session?.user?.email;

  return (
    <section>
      <h1>Home</h1>
      <div>{user ? <SignOutButton>{`Welcome ${user}`}</SignOutButton> : <SignIn />}</div>
    </section>
  );
}