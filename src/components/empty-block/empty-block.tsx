import { Empty } from 'antd';

import styles from './empty-block.module.scss';

export const EmptyBlock = () => (
    <Empty
        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
        imageStyle={{
            height: 32,
        }}
        description={false}
        className={styles.empty}
    />
);
