import { Link } from 'react-router-dom';

import { Paths } from '@type/paths';

import styles from './logo.module.scss';

type LogoProps = {
    isClosedSidebar: boolean;
};

export const Logo = ({ isClosedSidebar }: LogoProps) => (
    <Link to={Paths.MAIN} className={isClosedSidebar ? styles.logo_short : styles.logo} />
);
