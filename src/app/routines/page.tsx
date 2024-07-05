import { type Metadata } from 'next';
import { Suspense } from 'react';
import RoutineList from '../ui/routines/RoutineList';

 
export const metadata: Metadata = {
	title: 'Routines',
};

export default async function Page({
	searchParams,
}: {
	searchParams?: {
		query?: string;
	};
}) {
	const query = searchParams?.query ?? '';

	return (
		<div>
            Routines

			<Suspense fallback={<div>Loading...</div>}>
				<RoutineList /> 
			</Suspense>
		</div>
	);
}
