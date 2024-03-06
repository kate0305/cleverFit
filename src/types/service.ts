export enum Tags {
    FEEDBACKS = 'Feedbacks',
}

export type UserReq = {
    email: string;
    password: string;
};

export type LoginResp = {
    accessToken: string;
};

export type EmailResp = {
    email: string;
    message: string;
};

export type ConfirmEmailReq = {
    email: string;
    code: string;
};

export type ChangePasswordReq = {
    password: string;
    confirmPassword: string;
};

export type FeedbackReq = {
    message: string;
    rating: number;
};
