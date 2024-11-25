import { createSafeActionClient } from 'next-safe-action';
import { getServerAuthSession } from '@/server/auth';

const actionClient = createSafeActionClient({}).use(async ({ next }) => {
    const session = await getServerAuthSession();

    if (!session) {
        throw new Error('Session not found!');
    }
    // Return the next middleware with `userId` value in the context
    return next();
});

export default actionClient;
