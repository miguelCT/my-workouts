import { fetchRoutine } from '@/app/lib/data';
import { groupExercisesByEntryDate } from '@/app/lib/utils';
import {
	Grid,
	Typography
} from '@mui/material';
import NewDayCard from './NewDayCard';
import RoutineGroupCard from './RoutineGroupCard';

export default async function RoutineInfo({ id } : { id: string }) {

	const routineInfo = await fetchRoutine(id);

	const { name,  } = routineInfo;

	const groupedExercisesByDate = groupExercisesByEntryDate(routineInfo)
	
	const hasEntriesToday = groupedExercisesByDate.find(g => g[0] === new Date().toDateString())

	return (
		<>
			<Typography variant="h5" color="primary" sx={{
				my: 1,
			}}>
				Routines - {name}
			</Typography>
			<Grid container spacing={1}>
				{!hasEntriesToday && <RoutineGroupCard date={new Date().toDateString()} routineInfo={routineInfo} empty />}
				{groupedExercisesByDate.map(([date]) => (
					<RoutineGroupCard date={date} routineInfo={routineInfo} key={date} />
				))}

				
			</Grid>
			
		</>
	);
}   

