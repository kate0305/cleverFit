import { Link } from 'react-router-dom';

type LinkButtonProps = {
    to: string;
    icon?: JSX.Element;
    text?: string;
    className: string;
};

export const LinkButton = ({ to, icon, text, className }: LinkButtonProps) => (
    <Link to={to} className={className}>
        {icon}
        {text}
    </Link>
);
