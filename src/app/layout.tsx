import '@/styles/globals.css';
import theme from '@/styles/theme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { GeistSans } from 'geist/font/sans';
import AppBar from './ui/navigation/AppBar';

export const metadata = {
	title: 'Create T3 App',
	description: 'Generated by create-t3-app',
	icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={GeistSans.className}>
				<ThemeProvider theme={theme}>
					<CssBaseline enableColorScheme />

					<AppRouterCacheProvider>
						<Container sx={{ py: 2, pb: '66px' }}>
							{children}
						</Container>
						<AppBar />
					</AppRouterCacheProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
