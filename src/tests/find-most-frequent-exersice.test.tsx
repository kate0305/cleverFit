// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, test } from 'vitest';

import { UserTraining } from '@type/training';
import { findMostFrequentExercise } from '@utils/calcutate-data-for-achievements';

const today = new Date().setDate(new Date().getDate()).toString();
const twoDaysLater = new Date().setDate(new Date().getDate() + 2).toString();

const userTraining: UserTraining[] = [
    {
        _id: '1',
        name: 'Ноги',
        date: today,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: 6,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Присяд',
                replays: 3,
                weight: 50,
                approaches: 10,
            },
            {
                _id: '2',
                name: 'Толкание нагрузки',
                replays: 3,
                weight: 70,
                approaches: 10,
            },
        ],
    },
    {
        _id: '2',
        name: 'Руки',
        date: today,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: 1,
            repeat: false,
        },
        exercises: [
            {
                _id: '2',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '3',
        name: 'Силовая',
        date: twoDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: 7,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
];

test('find most frequent exercise to return the most frequent exercise', () => {
    const mostFrequentExercise = findMostFrequentExercise(userTraining);

    expect(mostFrequentExercise).toEqual({ name: 'Упражнение', count: 2 });
});

test('find most frequent exercise to return first most frequent exercise in case of a tie', () => {
    const userTrainingWithTie: UserTraining[] = [
        ...userTraining,
        {
            _id: '3',
            name: 'Руки',
            date: twoDaysLater,
            isImplementation: false,
            userId: '65b809899adc9e39e3660ae0',
            parameters: {
                jointTraining: false,
                participants: [],
                period: 1,
                repeat: false,
            },
            exercises: [
                {
                    _id: '3',
                    name: 'Присяд',
                    replays: 1,
                    weight: 0,
                    approaches: 3,
                },
            ],
        },
    ];
    const mostFrequentExercise = findMostFrequentExercise(userTrainingWithTie);

    expect(mostFrequentExercise).toEqual({ name: 'Присяд', count: 2 });
});

test('find most frequent exercise to return { name: "", count: 0 } for empty training array', () => {
    const mostFrequentExercise = findMostFrequentExercise([]);

    expect(mostFrequentExercise).toEqual({ name: '', count: 0 });
});
