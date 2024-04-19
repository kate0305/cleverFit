import { Pie, PieConfig } from '@ant-design/charts';
import { TABLET_WIDTH, XS_WIDTH } from '@constants/index';
import { MostFrequentExercise } from '@type/training';
import { useMediaQuery } from '@utils/use-media-query';

import styles from './pie-chart.module.scss';

type PieChartProps = {
    data: MostFrequentExercise[];
};

export const PieChart = ({ data }: PieChartProps) => {
    const isTablet = useMediaQuery(`(max-width: ${TABLET_WIDTH})`);
    const isMobile = useMediaQuery(`(max-width: ${XS_WIDTH})`);

    const config: PieConfig = {
        data,
        angleField: 'count',
        colorField: 'name',
        margin: isTablet && -50,
        width: isMobile ? 328 : 520,
        height: isTablet ? 211 : 334,
        innerRadius: 0.35,
        radius: 0.5,
        legend: false,
        label: {
            text: 'name',
            fontSize: isTablet ? 12 : 14,
            fontFamily: 'Inter',
            lineHeight: isTablet ? 16 : 18,
            position: 'outside',
            connector: false,
        },
        scale: { color: { palette: 'spectral' } },
    };

    return <Pie {...config} className={styles.wrapper} />;
};
