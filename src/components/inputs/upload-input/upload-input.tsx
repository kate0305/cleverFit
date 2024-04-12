import { Dispatch, useState } from 'react';
import { Button, Form, Upload, UploadProps } from 'antd';
import { UploadFile, UploadFileStatus } from 'antd/lib/upload/interface';
import { selectToken } from '@redux/redusers/user-data-slice';

import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { BASE_URL, UPLOAD_IMG, XS_WIDTH } from '@constants/index';
import { useAppSelector } from '@hooks/index';
import { ModalErrTypes } from '@type/modal-types';
import { useMediaQuery } from '@utils/use-media-query';

import { getModalErr } from '@components/modal-window/modal-err/modal-err';

import styles from './upload-input.module.scss';

export type UploadInputProps = {
    inputName: string;
    setBtnDisable: Dispatch<React.SetStateAction<boolean>>;
    imgUrl?: string;
    dataTestId?: string;
};

export const UploadInput = ({ inputName, imgUrl, setBtnDisable, dataTestId }: UploadInputProps) => {
    const isMobile = useMediaQuery(`(max-width: ${XS_WIDTH})`);
    const token = useAppSelector(selectToken);

    const initialFile = {
        uid: '0',
        url: imgUrl,
        name: 'user avatar',
    };

    const [fileList, setFileList] = useState<UploadFile[]>(imgUrl ? [initialFile] : []);

    const isHasAvatar = !fileList.length;

    const uploadImg: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        const file = newFileList[0];

        if (file && file.error?.status === 409) {
            const newFile = {
                ...file,
                thumbUrl: '',
                status: 'error' as UploadFileStatus,
            };

            setFileList([newFile]);
            getModalErr(ModalErrTypes.SAVE_USER_PHOTO);
            setBtnDisable(true);
        }

        if (file && file.status === 'error') {
            const newFile = {
                ...file,
                thumbUrl: '',
            };

            setFileList([newFile]);
            setBtnDisable(true);
        }
    };

    const mobileView = (
        <Button icon={<UploadOutlined />} className={styles.upload_btn}>
            Загрузить
        </Button>
    );

    const desctopView = (
        <div>
            <PlusOutlined />
            <div className={styles.upload_text}>Загрузить фото профиля</div>
        </div>
    );

    return (
        <Form.Item
            name={inputName}
            valuePropName='file'
            className={styles.upload}
            label={isMobile && isHasAvatar && 'Загрузить фото профиля::'}
            labelAlign='left'
            data-test-id={dataTestId}
        >
            <Upload
                accept='image/*'
                action={`${BASE_URL}${UPLOAD_IMG}`}
                fileList={fileList}
                headers={{ authorization: `Bearer ${token}` }}
                listType={isMobile ? 'picture' : 'picture-card'}
                maxCount={1}
                progress={{
                    strokeWidth: 4,
                    strokeColor: 'var(--primary-light-6)',
                    showInfo: false,
                }}
                onChange={uploadImg}
            >
                {isHasAvatar && (isMobile ? mobileView : desctopView)}
            </Upload>
        </Form.Item>
    );
};
