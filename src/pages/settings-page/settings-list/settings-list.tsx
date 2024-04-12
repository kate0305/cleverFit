import { Form, Switch, Tooltip, Typography } from 'antd';
import { selectUser } from '@redux/redusers/user-data-slice';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { XS_WIDTH } from '@constants/index';
import { useAppSelector } from '@hooks/index';
import { useUpdateUserDataMutation } from '@services/user-service';
import { UserDataReq } from '@type/service';
import { useMediaQuery } from '@utils/use-media-query';

import { settings } from '../data';

import styles from './settings-list.module.scss';

const { Text } = Typography;

export const SettingsList = () => {
    const isMobile = useMediaQuery(`(max-width: ${XS_WIDTH})`);
    const { userData } = useAppSelector(selectUser);
    const [updateUserData] = useUpdateUserDataMutation();

    const isProTatiff = userData?.tariff?.tariffId;

    const onFormValuesChange = async (changedValues: Partial<UserDataReq>) => {
        const formFieldName = Object.keys(changedValues)[0];

        if (formFieldName === 'darkTheme') return;
        await updateUserData(changedValues);
    };

    return (
        <Form
            className={styles.wrapper}
            initialValues={{ ...userData }}
            onValuesChange={onFormValuesChange}
        >
            {settings.map(({ id, fieldName, type, tooltipText, dataTestId, iconTestId }) => {
                const isDisable = !isProTatiff && fieldName === 'darkTheme';

                return (
                    <div key={id} className={styles.setting_type}>
                        <Text className={isDisable ? styles.disabled_text : styles.text}>
                            {type}
                            <Tooltip
                                placement={isMobile ? 'topLeft' : 'bottomLeft'}
                                title={tooltipText}
                                color='var(--neutral-gray-13)'
                                overlayClassName={styles.tooltip}
                            >
                                <ExclamationCircleOutlined
                                    style={{
                                        fontSize: 'var(--font-size-m)',
                                        color: 'var(--light-secondary-45)',
                                    }}
                                    data-test-id={iconTestId}
                                />
                            </Tooltip>
                        </Text>
                        <Form.Item name={fieldName} valuePropName='checked'>
                            <Switch
                                disabled={isDisable}
                                data-test-id={dataTestId}
                                size={isMobile ? 'small' : 'default'}
                            />
                        </Form.Item>
                    </div>
                );
            })}
        </Form>
    );
};
