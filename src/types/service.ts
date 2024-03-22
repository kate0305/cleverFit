import { UserTraining } from './training';

export enum Tags {
    FEEDBACKS = 'Feedbacks',
    TRAINING = 'Training',
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

export type UserTrainingResp = Record<string, UserTraining[]>;

export type UserTrainingReq = Omit<UserTraining, '_id' | 'userId'>;

export type TrainingResp = {
    name: string;
    key: string;
};

export type UpdateTrainingReq = UserTrainingReq & {
    id: string;
};

