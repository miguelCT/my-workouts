
'use client';

import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BackButton from './BackButton';

export default function AppBackNavigation() {
	const path = usePathname();
	return (
		<>
			{ 
				path !== "/routines" && <BackButton previousPage={'/routines'}  />
			}
		</>
	);
}
