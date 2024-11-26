import {
    createSafeActionClient,
    DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';
import { getServerAuthSession } from '@/server/auth';
import * as Sentry from '@sentry/nextjs';

class ActionError extends Error {}

const actionClient = createSafeActionClient({
    handleServerError(e) {
        Sentry.captureException(e);
        console.error('Action error:', e.message);

        if (e instanceof ActionError) {
            return e.message;
        }

        return DEFAULT_SERVER_ERROR_MESSAGE;
    },
}).use(async ({ next }) => {
    const session = await getServerAuthSession();

    if (!session) {
        throw new Error('Session not found!');
    }
    // Return the next middleware with `userId` value in the context
    return next();
});

export default actionClient;
