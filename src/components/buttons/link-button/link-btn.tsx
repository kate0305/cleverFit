import { Link, LinkProps } from 'react-router-dom';

import styles from './link-btn.module.scss';

type LinkButtonProps = {
    to: string;
    state?: LinkProps['state'];
    icon?: JSX.Element;
    text?: string;
    dataTestId?: string;
    className: string;
};

export const LinkButton = ({ to, state, icon, text, dataTestId, className }: LinkButtonProps) => (
    <Link
        to={to}
        className={`${styles.link_btn} ${className}`}
        state={state}
        data-test-id={dataTestId}
    >
        {icon}
        {text}
    </Link>
);
