import { Button } from '@mui/material';
import Link from 'next/link';

import type { Route } from 'next';

type BackButtonProps<T extends string> = {
	previousPage: Route<T> | URL;
};


function BackButton<T extends string>({ previousPage }: BackButtonProps<T>) {
	return (
		<Button component={Link} href={previousPage as string} variant="outlined" size='small'>
            Back
		</Button>
	)
}

export default BackButton;