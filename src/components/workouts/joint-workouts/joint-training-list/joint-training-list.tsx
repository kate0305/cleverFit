import { useState } from 'react';
import { Input, List } from 'antd';
import { selectUsersForJointTrainings } from '@redux/redusers/training-partners-slice';

import { useAppSelector } from '@hooks/index';
import { PartnerCardTypes } from '@type/card';
import { getSortedUserList } from '@utils/get-sorted-user-lists';
import { useMediaQuery } from '@utils/use-media-query';

import { GoBackBtn } from '@components/buttons/go-back-button';

import { PartnerCard } from '../cards/partner-card';

import styles from './joint-training-list.module.scss';

const { Search } = Input;

type JointTrainingListProps = {
    handleGoBackClick: () => void;
};

export const JointTrainingList = ({ handleGoBackClick }: JointTrainingListProps) => {
    const isScreen = useMediaQuery('(max-width: 1287px)');
    const isTablet = useMediaQuery('(max-width: 1038px)');

    const usersList = useAppSelector(selectUsersForJointTrainings);

    const sortedList = getSortedUserList(usersList);

    const [searchValue, setSearchValue] = useState('');

    const filteredList = sortedList.filter(({ name }) =>
        name.toLowerCase().includes(searchValue.toLowerCase()),
    );

    const handleSearch = (value: string) => setSearchValue(value);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <GoBackBtn text='Назад ' onClick={handleGoBackClick} />
                <Search
                    placeholder='Поиск по имени'
                    onSearch={handleSearch}
                    className={styles.search}
                    data-test-id='search-input'
                />
            </div>
            <List
                grid={{
                    gutter: isTablet ? 12 : 16,
                    xs: 1,
                }}
                dataSource={filteredList}
                renderItem={(partner, index) => (
                    <List.Item className={styles.list_item}>
                        <PartnerCard
                            partnerData={partner}
                            searchValue={searchValue}
                            type={PartnerCardTypes.JOINT}
                            index={index}
                        />
                    </List.Item>
                )}
                pagination={{
                    size: 'small',
                    pageSize: (isTablet && 8) || (isScreen && 9) || 12,
                }}
                className={styles.list}
            />
        </div>
    );
};
