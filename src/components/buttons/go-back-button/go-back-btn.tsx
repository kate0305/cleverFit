import { ArrowLeftOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/data-test-id';

import { PrimaryBtn } from '../primary-button';

import styles from './go-back-btn.module.scss';

type GoBackBtnProps = {
    text: string;
    onClick: () => void;
    dataTestId?: string;
};

export const GoBackBtn = ({ onClick, text, dataTestId }: GoBackBtnProps) => (
    <PrimaryBtn
        type='ghost'
        className={styles.button}
        onClick={onClick}
        btnText={text}
        icon={
            <ArrowLeftOutlined
                style={{ fontSize: 'var(--gap-14)', color: 'var(--light-title-85)' }}
            />
        }
        dataTestId={dataTestId || DATA_TEST_ID.settingsBack}
    />
);
