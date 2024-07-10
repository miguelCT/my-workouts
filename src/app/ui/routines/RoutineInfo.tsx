import { fetchRoutine } from '@/app/lib/data';
import { type ExerciseEntry, type ExerciseTemplate } from '@/app/lib/definitions';
import { groupExercisesByEntryDate, groupExercisesByName } from '@/app/lib/utils';
import {
	Box,
	Button,
	Grid,
	TextField,
	Typography
} from '@mui/material';
import ExerciseEntryCard from './ExerciseEntryCard';
import NewDayCard from './NewDayCard';
import RoutineGroupCard from './RoutineGroupCard';


export default async function RoutineInfo({ id } : { id: number }) {

	const routineInfo = await fetchRoutine(id);

	const { name,  } = routineInfo;

	const groupedExercisesByDate = groupExercisesByEntryDate(routineInfo)
	const groupedExerciseTemplatesByName = groupExercisesByName(routineInfo)
	
	const hasEntriesToday = groupedExercisesByDate.find(g => g[0] === new Date().toLocaleDateString())
	console.log('groupedExercisesByDate', groupedExercisesByDate)

	return (
		<>
			<Typography variant="h6">{name}</Typography>
			<Grid container spacing={1}>
				{!hasEntriesToday && <NewDayCard groupedTemplates={groupedExerciseTemplatesByName} />}
				{groupedExercisesByDate.map(([date, groupedExercises]) => (
					<RoutineGroupCard date={date} groupedExercises={groupedExercises} key={date} />
				))}

				
			</Grid>
			
		</>
	);
}   

