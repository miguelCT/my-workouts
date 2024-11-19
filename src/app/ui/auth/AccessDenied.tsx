import SignInButton from './SignInButton';

export default function AccessDenied() {
    return (
        <>
            <h1>Access Denied</h1>
            <p>
                <div>You must be signed in to view this page</div>
                <SignInButton />
            </p>
        </>
    );
}
