'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
	return (
		<form
			action={async () => {
				await signOut();
			}}
		>
			<button type="submit">Sign out</button>
		</form>
	);
}
