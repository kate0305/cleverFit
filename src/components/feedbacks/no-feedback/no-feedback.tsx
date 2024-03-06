import { Typography } from 'antd';
import classnames from 'classnames/bind';

import { selectIsOpenSideBar } from '@redux/redusers/app-slice';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

import { ContentCard } from '@components/content-card';

import styles from './no-feedback.module.scss';

const { Title, Paragraph } = Typography;

const cx = classnames.bind(styles);

export const NoFeedback = () => {
    const isOpenSidebar = useAppSelector(selectIsOpenSideBar);

    const card = cx({
        card: true,
        with_extra_padding: !isOpenSidebar,
    });

    const Content = () => (
        <>
            <Title>Оставьте свой отзыв первым</Title>
            <Paragraph className={styles.text}>
                Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь
                своим мнением и опытом с другими пользователями, <br />и помогите им сделать
                правильный выбор.
            </Paragraph>
        </>
    );

    return <ContentCard bordered={false} className={card} content={<Content />} />;
};
