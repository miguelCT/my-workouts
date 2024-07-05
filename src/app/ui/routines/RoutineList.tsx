import { fetchRoutines } from "@/app/lib/data";
import Link from "next/link";

export default async function RoutineList() {
	const routines = await fetchRoutines();
	return (
		<ul>
			{routines.map(routine => (
				<li key={routine.id}>
					<Link href={`/routines/${routine.id}`}>{routine.name}</Link>
				</li>
			))}
		</ul>
	)
}