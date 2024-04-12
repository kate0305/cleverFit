import { UploadFile } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';

import { BASE_AVATAR_URL } from '@constants/index';

export const getAvatarSrc = (imgData: string | UploadChangeParam<UploadFile>) => {
    if (typeof imgData === 'string') {
        return imgData;
    }

    if (imgData.file.status === 'removed') {
        return '';
    }

    return `${BASE_AVATAR_URL}${imgData.file.response.url}`;
};
