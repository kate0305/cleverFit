import React from 'react';
import { Typography } from 'antd';

import { possibilities } from '../data';

import styles from './possibilities-section.module.scss';

const { Paragraph } = Typography;

export const PossibilitieSection: React.FC = () => (
    <div>
        <Paragraph className={styles.text}>С CleverFit ты сможешь:</Paragraph>
        <ul>
            {possibilities.map(({ id, text }) => (
                <li key={id}>
                    <Paragraph className={styles.text}>— {text}</Paragraph>
                </li>
            ))}
        </ul>
    </div>
);
