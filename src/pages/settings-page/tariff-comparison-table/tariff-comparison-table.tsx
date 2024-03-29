import { CSSProperties } from 'react';
import { Col, Row, Typography } from 'antd';

import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { conditions } from './data';

import styles from './tariff-comparison-table.module.scss';

const { Text } = Typography;

export type TariffComparisonTableProps = {
    isProTatiff?: string;
};

export const TariffComparisonTable = ({ isProTatiff }: TariffComparisonTableProps) => {
    const checkIconStyle: CSSProperties = { color: '#262626', fontSize: '18px' };
    const closeIconStyle: CSSProperties = { color: '#bfbfbf', fontSize: '18px' };

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Text className={styles.text_mark}>free</Text>
                <Text className={isProTatiff ? styles.text_pro : styles.text_mark_color}>
                    pro
                    {isProTatiff && <CheckCircleOutlined />}
                </Text>
            </div>
            <Row gutter={[0, { xs: 8, sm: 16 }]}>
                {conditions.map(({ id, condition, inPro, inFree }) => (
                    <Col span={24} key={id} className={styles.condition}>
                        <Text className={styles.condition_text}>{condition}</Text>
                        <span>
                            {inFree ? (
                                <CheckCircleFilled style={checkIconStyle} />
                            ) : (
                                <CloseCircleOutlined style={closeIconStyle} />
                            )}
                        </span>
                        <span>
                            {inPro ? (
                                <CheckCircleFilled style={checkIconStyle} />
                            ) : (
                                <CloseCircleOutlined style={closeIconStyle} />
                            )}
                        </span>
                    </Col>
                ))}
            </Row>
        </div>
    );
};
