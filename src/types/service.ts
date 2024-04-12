import { InvitateStatus, InviteFrom } from './invite';
import { TariffPeriod } from './tariff';
import { UserTraining } from './training';
import { UserTariff } from './user';

export enum Tags {
    FEEDBACKS = 'Feedbacks',
    TRAINING = 'Training',
    USER = 'User',
    RARTNERS = 'Partners',
    USERS_FOR_JOINT_WORKOUT = 'Joint_workouts',
    INVITE = 'JInvite',
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

export type UserDataResp = {
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    imgSrc: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    tariff: UserTariff;
};

export type UserDataReq = Partial<
    Omit<UserDataResp, 'tariff'> & {
        password: string;
    }
>;

export type TariffResp = {
    _id: string;
    name: string;
    periods: TariffPeriod[];
};

export type PayNewTariffResp = {
    tariffId: string;
    days: number;
};

export type InviteReq = {
    to: string;
    trainingId: string;
};

export type InviteResp = {
    _id: string;
    from: InviteFrom;
    training: UserTraining;
    status: InvitateStatus;
    createdAt: string;
};

export type InviteAnswerReq = {
    id: string;
    status: 'accepted' | 'rejected';
};
