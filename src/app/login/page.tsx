import { type NextPage } from 'next';
import SignInButton from '@/app/ui/auth/SignInButton';
import { redirect } from 'next/navigation';
import { getServerAuthSession } from '@/server/auth';

const Page: NextPage = async () => {
    const session = await getServerAuthSession();

    if (session) {
        redirect('/');
    }

    return <SignInButton />;
};

export default Page;
