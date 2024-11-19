'use client';

import { usePathname } from 'next/navigation';
import BackButton from './BackButton';

export default function AppBackNavigation() {
    const path = usePathname();
    return (
        <>{path !== '/routines' && <BackButton previousPage={'/routines'} />}</>
    );
}
