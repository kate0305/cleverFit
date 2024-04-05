import { Dispatch, Fragment, useState } from 'react';
import { Form, Typography } from 'antd';
import dayjs from 'dayjs';
import { selectUserData } from '@redux/redusers/user-data-slice';

import { CloseOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/index';
import { DateFormats } from '@type/dates';
import { DrawerTitleKeys } from '@type/drawer';
import { useLogOut } from '@utils/use-logout';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { DrawerComponent } from '@components/drawer';
import { ModalWindow } from '@components/modal-window';
import { ResultWithEmail } from '@components/request-result/result-with-email';

import { TariffComparisonTable } from '../tariff-comparison-table';
import { TariffPriceForm } from '../tariff-price-form';

import styles from './drawer-compare-tariffs.module.scss';

type DrawerCompareTariffsProps = {
    isOpenDrawer: boolean;
    setCloseDrawer: Dispatch<React.SetStateAction<boolean>>;
};

const { Title } = Typography;

export const DrawerCompareTariffs = ({
    isOpenDrawer,
    setCloseDrawer,
}: DrawerCompareTariffsProps) => {
    const [form] = Form.useForm();
    const [isOpenModal, setOpenModal] = useState(false);
    const [isBtnDisabled, setBtnDisabled] = useState(true);

    const userData = useAppSelector(selectUserData);

    const isProTatiff = userData?.tariff?.tariffId;
    const expiredDate = dayjs(userData?.tariff?.expired).format(DateFormats.DD_MM);

    const closeDrawer = () => {
        setCloseDrawer(false);
    };

    const logOut = useLogOut();

    const submitForm = () => {
        form.submit();
    };

    return (
        <Fragment>
            <ModalWindow
                isOpen={isOpenModal}
                closable={true}
                onCancel={logOut}
                closeIcon={<CloseOutlined style={{ fontSize: '14px', color: '#8c8c8c' }} />}
                dataTestId='tariff-modal-success'
            >
                <ResultWithEmail email={userData?.email} />
            </ModalWindow>
            <DrawerComponent
                isOpenDrawer={isOpenDrawer}
                setCloseDrawer={closeDrawer}
                titleChildren={{ type: DrawerTitleKeys.COMPARE, text: 'Сравнить тарифы' }}
                footer={
                    !isProTatiff && (
                        <PrimaryBtn
                            type='primary'
                            btnText='Выбрать и оплатить'
                            htmlType='submit'
                            className={styles.btn_pay}
                            disabled={isBtnDisabled}
                            onClick={submitForm}
                            dataTestId='tariff-submit'
                        />
                    )
                }
                dataTestId='tariff-sider'
            >
                <div className={styles.body}>
                    {isProTatiff && (
                        <Title level={5} className={styles.subtitle}>
                            Ваш PRO tarif активен до {expiredDate}
                        </Title>
                    )}
                    <TariffComparisonTable isProTatiff={isProTatiff} />
                    {!isProTatiff && (
                        <TariffPriceForm
                            setBtnDisabled={setBtnDisabled}
                            setOpenModal={setOpenModal}
                            closeDrawer={closeDrawer}
                            form={form}
                        />
                    )}
                </div>
            </DrawerComponent>
        </Fragment>
    );
};
