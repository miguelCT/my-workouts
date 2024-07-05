import { fetchRoutine } from "@/app/lib/data";

export default async function RoutineInfo({ id } : { id: number }) {

	const routineInfo = await fetchRoutine(id);
	return (
		<div>
			<h1>Routine Info</h1>
			{JSON.stringify(routineInfo)}
		</div>
	);
}   