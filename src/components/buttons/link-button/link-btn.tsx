import { Link } from 'react-router-dom';

import styles from './link-btn.module.scss';

type LinkButtonProps = {
    to: string;
    icon?: JSX.Element;
    text?: string;
    className: string;
};

export const LinkButton = ({ to, icon, text, className }: LinkButtonProps) => (
    <Link to={to} className={`${styles.link_btn} ${className}`}>
        {icon}
        {text}
    </Link>
);
