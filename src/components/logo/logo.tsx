import { Link } from 'react-router-dom';

import styles from './logo.module.scss';

type LogoProps = {
    isClosedSidebar: boolean;
};

export const Logo = ({ isClosedSidebar }: LogoProps) => {
    return <Link to='/' className={isClosedSidebar ? styles.logo_short : styles.logo} />;
};
