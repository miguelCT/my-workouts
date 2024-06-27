'use client';

import { signIn } from 'next-auth/react';

export default function SignInButton() {
	return (
		<form
			action={async () => {
				await signIn();
			}}
		>
			<button type="submit">Sign in</button>
		</form>
	);
}
