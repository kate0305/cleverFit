// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, test } from 'vitest';

import { UserTraining } from '@type/training';
import { findExersiceByName } from '@utils/find-exercise-by-name';

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

test('find exersice by filter "All"', () => {
    const exercises = findExersiceByName(userTraining, 'Все');

    expect(exercises).toEqual(['Присяд', 'Толкание нагрузки', 'Упражнение', 'Упражнение']);
});

test('find exersice for specific filter', () => {
    const exercises = findExersiceByName(userTraining, 'Ноги');

    expect(exercises).toEqual(['Присяд', 'Толкание нагрузки']);
});

test('find exersice empty result for unknown filter', () => {
    const exercises = findExersiceByName(userTraining, 'Not found training');

    expect(exercises).toEqual([]);
});
