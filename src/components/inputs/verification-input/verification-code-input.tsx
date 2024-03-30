import { useState } from 'react';
import VerificationInput from 'react-verification-input';
import classnames from 'classnames/bind';

import styles from './verification-code-input.module.scss';

const cx = classnames.bind(styles);

export type VerificationCodeInputProps = {
    onComplete: (value: string) => void;
    isError: boolean;
};

export const VerificationCodeInput = ({ onComplete, isError }: VerificationCodeInputProps) => {
    const [value, setValue] = useState('');

    const className = cx({
        character: true,
        err: isError,
    });

    const classNames = {
        container: styles.container,
        character: className,
    };

    const handleOnComplete = (code: string) => {
        onComplete(code);
        setValue('');
    }

    return (
        <VerificationInput
            placeholder=''
            value={value}
            onChange={setValue}
            onComplete={handleOnComplete}
            autoFocus={true}
            classNames={classNames}
            inputProps={{ 'data-test-id': 'verification-input' }}
        />
    );
};
