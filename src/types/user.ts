import { UploadFile } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';

import { UserDataReq } from './service';

export type UserFormData = Omit<UserDataReq, 'readyForJointTraining' | 'sendNotification' | 'imgSrc'> & {
    imgSrc: UploadChangeParam<UploadFile> | string;
    confirmPassword: string;
};

export type UserTariff = {
    tariffId: string;
    expired: string;
};
