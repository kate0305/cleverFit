import { Fragment, useState } from 'react';
import classnames from 'classnames/bind';
import dayjs from 'dayjs';

import { CheckOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { DateFormats } from '@type/dates';

import { DrawerCompareTariffs } from '@pages/settings-page/drawer-compare-tariffs';
import { PrimaryBtn } from '@components/buttons/primary-button';
import { ContentCard } from '@components/content-card';

import { TariffCardTitle } from './title/title';

import styles from './tariff-card.module.scss';

type TariffCardProps = {
    tariffType: string;
    isActive: boolean;
    img: string;
    tariffIexpired?: string;
    dataTestId?: string;
};

const cx = classnames.bind(styles);

export const TariffCard = ({
    tariffType,
    img,
    isActive,
    tariffIexpired,
    dataTestId,
}: TariffCardProps) => {
    const [isOpenCompareTariffs, setOpenCompareTariffs] = useState(false);

    const imgStyle = cx({
        img: true,
        img_disabled: !isActive,
    });

    const expiredDate = dayjs(tariffIexpired).format(DateFormats.DD_MM);

    const getDetails = () => setOpenCompareTariffs(true);

    return (
        <Fragment>
            <ContentCard
                title={<TariffCardTitle tariffType={tariffType} />}
                extra={
                    <PrimaryBtn
                        type='link'
                        btnText='Подробнее'
                        onClick={getDetails}
                        className={styles.btn_details}
                    />
                }
                bordered={false}
                cover={<img alt='tariff name' src={img} className={imgStyle} />}
                actions={[
                    isActive ? (
                        <div className={styles.footer}>
                            <p className={styles.footer_text}>
                                активен
                                {!tariffIexpired && (
                                    <CheckOutlined style={{ fontSize: 'var(--font-size-m)' }} />
                                )}
                            </p>
                            {tariffIexpired && (
                                <p className={styles.footer_text}>до {expiredDate}</p>
                            )}
                        </div>
                    ) : (
                        <PrimaryBtn
                            type='primary'
                            className={styles.activate_btn}
                            btnText='Активировать'
                            dataTestId={DATA_TEST_ID.activateTariffBtn}
                            onClick={getDetails}
                        />
                    ),
                ]}
                dataTestId={dataTestId}
                className={styles.wrapper}
            />
            <DrawerCompareTariffs
                isOpenDrawer={isOpenCompareTariffs}
                setCloseDrawer={setOpenCompareTariffs}
            />
        </Fragment>
    );
};
