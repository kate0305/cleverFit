import { addLoader, removeLoader } from "@redux/redusers/app-slice";

import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

type OnQueryStarted = {
    dispatch: ThunkDispatch<any, any, UnknownAction>;
    queryFulfilled: any;
};
export const commonOnQueryStarted = async (
    { dispatch, queryFulfilled }: OnQueryStarted,
    showLoading = false,
) => {
    try {
        if (showLoading) {
            dispatch(addLoader(true));
        }

        await queryFulfilled;

        if (showLoading) {
            dispatch(removeLoader(false));
        }
    } catch {
        if (showLoading) {
            dispatch(removeLoader(false));
        }
    }
};
