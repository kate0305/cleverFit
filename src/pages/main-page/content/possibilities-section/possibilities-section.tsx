import React from 'react';
import { Typography } from 'antd';

import styles from './possibilities-section.module.scss';

import { possibilities } from '../data';

const { Paragraph } = Typography;

export const PossibilitieSection: React.FC = () => {
    return (
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
};
