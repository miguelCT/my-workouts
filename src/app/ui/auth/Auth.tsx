import { type FC, type PropsWithChildren } from 'react';
import { getServerAuthSession } from '@/server/auth';
import AccessDenied from './AccessDenied';

const Auth: FC<PropsWithChildren> = async ({ children }) => {
    const session = true || (await getServerAuthSession());

    return !session ? <AccessDenied /> : <>{children}</>;
};

export default Auth;
