import { Dispatch, useEffect } from 'react';
import { Form, FormInstance, Radio } from 'antd';
import { selectUser } from '@redux/redusers/user-data-slice';

import { DATA_TEST_ID } from '@constants/data-test-id';
import { useAppSelector } from '@hooks/index';
import { usePayNewTariffMutation } from '@services/user-service';
import { replacePartOfString } from '@utils/replace-part-string';

import styles from './tariff-price-form.module.scss';

type TariffPriceFormProps = {
    setBtnDisabled: Dispatch<React.SetStateAction<boolean>>;
    setOpenModal: Dispatch<React.SetStateAction<boolean>>;
    form: FormInstance<{ days: number }>;
    closeDrawer: () => void;
};

export const TariffPriceForm = ({
    form,
    setBtnDisabled,
    setOpenModal,
    closeDrawer,
}: TariffPriceFormProps) => {
    const { tariffList } = useAppSelector(selectUser);
    // eslint-disable-next-line no-underscore-dangle
    const tariffId = tariffList[0]?._id;
    const periodsList = tariffList.flatMap(({ periods }) => periods);

    const [payNewTariff, { isSuccess, error }] = usePayNewTariffMutation();

    const onFormValuesChange = () => setBtnDisabled(false);

    const onSubmit = async (days: { days: number }) => {
        const data = {
            tariffId,
            ...days,
        };

        await payNewTariff(data);
    };

    useEffect(() => {
        if (isSuccess) {
            setOpenModal(true);
            closeDrawer();
        }
    }, [closeDrawer, error, isSuccess, setOpenModal]);

    return (
        <Form
            form={form}
            className={styles.wrapper}
            onValuesChange={onFormValuesChange}
            onFinish={onSubmit}
            data-test-id={DATA_TEST_ID.tariffCost}
        >
            <fieldset>
                <legend className={styles.title}>Стоимость тарифа</legend>
                <Form.Item name='days' className={styles.tafiffs}>
                    <Radio.Group className={styles.btn_group}>
                        {periodsList?.map(({ text, cost, days }) => (
                            <Radio
                                value={days}
                                key={text}
                                className={styles.radio}
                                data-test-id={`${DATA_TEST_ID.tarif}${cost}`}
                            >
                                <div className={styles.radio_container}>
                                    <span className={styles.period}>{text}</span>
                                    <span className={styles.price}>{`${replacePartOfString(
                                        cost.toString(),
                                    )} $`}</span>
                                </div>
                            </Radio>
                        ))}
                    </Radio.Group>
                </Form.Item>
            </fieldset>
        </Form>
    );
};
