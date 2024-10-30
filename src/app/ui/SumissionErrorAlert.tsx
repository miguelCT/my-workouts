import { Alert } from '@mui/material';
import { type SafeActionResult } from 'next-safe-action';
import { type FC } from 'react';
import { type Schema } from 'zod';

type V = {
    errors: Record<string, string[]>;
    message: string;
};

const SubmissionErrorAlert: FC<
    Pick<
        SafeActionResult<string, Schema, Schema[], V>,
        'serverError' | 'validationErrors'
    >
> = ({ serverError, validationErrors }) => {
    if (!serverError && !validationErrors) {
        return null;
    }

    return (
        <Alert severity="error">
            {serverError}
            {validationErrors?.message}
            <ul>
                {Object.values(validationErrors?.errors ?? {}).map(error => (
                    <li key={error.toLocaleString()}>{error.join(' ')}</li>
                ))}
            </ul>
        </Alert>
    );
};

export default SubmissionErrorAlert;
