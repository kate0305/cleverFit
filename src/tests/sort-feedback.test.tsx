// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, test } from 'vitest';

import { sortFeedbacks } from '@utils/sort-feedback';

describe('sortFeedbacks', () => {
    test('should sort feedbacks by createdAt in descending order', () => {
        const feedbacks = [
            {
                id: '1',
                fullName: 'User 1',
                imageSrc: 'image1.jpg',
                message: 'test1',
                rating: 1,
                createdAt: '2024-01-31T06:57:32.243Z',
            },
            {
                id: '2',
                fullName: 'User 2',
                imageSrc: 'image2.jpg',
                message: 'test2',
                rating: 5,
                createdAt: '2024-01-30T06:57:32.243Z',
            },
            {
                id: '3',
                fullName: 'User 3',
                imageSrc: 'image3.jpg',
                message: 'test3',
                rating: 2,
                createdAt: '2024-01-28T06:57:32.243Z',
            },
            {
                id: '4',
                fullName: 'User 4',
                imageSrc: 'image4.jpg',
                message: 'test4',
                rating: 3,
                createdAt: '2024-01-29T06:57:32.243Z',
            },
            {
                id: '5',
                fullName: 'User 5',
                imageSrc: 'image5.jpg',
                message: 'test5',
                rating: 4,
                createdAt: '2024-01-27T06:57:32.243Z',
            },
        ];

        const sortedFeedbacks = sortFeedbacks(feedbacks);

        expect(sortedFeedbacks[0].id).toBe('1');
        expect(sortedFeedbacks[4].id).toBe('5');
    });
});
