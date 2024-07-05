import BackButton from "@/app/ui/navigation/BackButton";
import { Box } from "@mui/material";

export const metadata = {
	title: 'Routine'
};

export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Box sx={{padding: 1}}>
			<BackButton previousPage="/routines"/>
			{children}
		</Box>
	);
}
