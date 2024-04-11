import { InvitateStatus } from './invite';

export type TrainingData = {
    name: string;
    date: string;
};

export type TrainingParameters = {
    repeat: boolean;
    period: number;
    jointTraining: boolean;
    participants: string[];
};

export type Exercise = {
    _id: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
};

export type ExerciseData = Partial<Exercise>;

export type UserTraining = {
    _id: string;
    name: string;
    date: string;
    userId: string;
    exercises: ExerciseData[];
    isImplementation?: boolean;
    parameters?: Partial<TrainingParameters>;
};

export enum BadgeColors {
    'Ноги' = '#ff4d4f',
    'Силовая' = '#fadb14',
    'Руки' = '#13c2c2',
    'Грудь' = '#52c41a',
    'Спина' = '#fa8c16',
}

export type TrainingPartner = {
    id: string;
    name: string;
    trainingType: string;
    imageSrc: string | null;
    avgWeightInWeek: number;
    inviteId: string;
    status: InvitateStatus;
};

export enum TrainingTypes {
    'Ноги' = 'legs',
    'Силовая' = 'strength',
    'Руки' = 'hands',
    'Грудь' = 'chest',
    'Спина' = 'back',
}

export enum TypesWorkoutForMessage {
    'Ноги' = 'тренировок на ноги',
    'Силовая' = 'силовых тренировок',
    'Руки' = 'тренировок на ноги',
    'Грудь' = 'тренировок на грудь',
    'Спина' = 'тренировок на спину',
}

export enum UserStatus {
    ACCEPTED = 'accepted',
    PENDING = 'pending',
    REJECTED = 'rejected',
}

export type JointTrainingDrawerData = {
    isJointWorkout: boolean;
    trainingName: string;
    userId: string;
    userName: string;
    imageSrc: string | null;
};
