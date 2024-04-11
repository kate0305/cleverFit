import { TrainingPartner } from '@type/training';

export const getSortedUserList = (userTrainingsList: TrainingPartner[]) => {
    const userStatus: Record<string, number> = {
        accepted: 0,
        pending: 1,
        null: 2,
        rejected: 3,
    };

    const sortedList = [...userTrainingsList].sort(
        (a, b) =>
            userStatus[a.status ?? 'null'] - userStatus[b.status ?? 'null'] ||
            a.name.localeCompare(b.name),
    );

    return sortedList;
};
