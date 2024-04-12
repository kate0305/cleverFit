import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError =>
    typeof error === 'object' && error != null && 'status' in error;

export const isErrorWithMessage = (error: unknown): error is { message: string } =>
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string';

export const getErrMessage = (error: FetchBaseQueryError | SerializedError) => {
    if ('status' in error) {
        const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);

        return errMsg;
    }

    return error.message;
};

export const errorHandler = (error: unknown) => {
    if (isFetchBaseQueryError(error)) {
        const errStatus = error.status;
        const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);

        return { errStatus, errMsg };
    }
    if (isErrorWithMessage(error)) {
        return error.message;
    }

    return undefined;
};
