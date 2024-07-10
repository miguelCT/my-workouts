'use client';

import { createDayInRoutine } from '@/app/lib/actions';
import { type ExerciseTemplate } from '@/app/lib/definitions';
import { formValues } from '@/app/lib/mockData';
import {
	Box,
	Button,
	Grid,
	Typography
} from '@mui/material';
import { useParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import ExerciseEntryCard from './ExerciseEntryCard';

type NewDayCardProps = {
	groupedTemplates: [group: string, ExerciseTemplate[]][]
}
export default function NewDayCard({ groupedTemplates }: NewDayCardProps) {
	const { routineId } = useParams<{ routineId: string }>()
	const [pending, startTransaction] = useTransition();
	const submitAction = async () => {
		startTransaction(async () => {
			const r = await createDayInRoutine(routineId, formValues);
			console.log('submitAction', r)
		})
	}
	const selectedDate = new Date();
	return <Grid item xs={6} md key={selectedDate.toISOString()} sx={{ border: 1, borderStyle: 'dashed', backgroundColor: t => t.palette.grey[100] }}>
		<form action={
			submitAction
		}>
			<Typography variant="subtitle1">{selectedDate.toLocaleDateString()} [today]</Typography>
			{groupedTemplates.map(([group, templates]) => (
				<Box key={group} sx={{ m: 0.5, borderBottom: '1px dashed gray', pb: 1 }}>
					{group}
					{/* {tuples.map(([template, exercises]) => <ExerciseEntryCard key={template.name} entries={exercises} template={template}/>)} */}
					{
						templates.map((template) => <ExerciseEntryCard key={template.name} 
							entries={[...Array(template.series_max).keys()].map(() => ({
								date: '',
								weight:  0,
								repetitions: 0
							}))} 
							template={template} />)
					}
				</Box>
			))}
			<Button type='submit' disabled={pending}>Start day</Button> 
		</form>
	</Grid>
}