import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, MenuProps } from 'antd';
import { selectTrainingPartners } from '@redux/redusers/training-partners-slice';

import { DATA_TEST_ID } from '@constants/data-test-id';
import { MAX_NUMBER_WORKOUT_PARTNERS } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Paths } from '@type/paths';
import { ResultRequestKeys } from '@type/result-request-keys';
import { useCalendarClick } from '@utils/use-click-calendar';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { ModalWindow } from '@components/modal-window';
import { RequestResult } from '@components/request-result';

import { createMenuItemsArr } from './data';

import styles from './navbar.module.scss';

type NavbarProps = {
    isWidthChanged: boolean;
    isClosedSidebar: boolean;
};

export const Navbar = ({ isWidthChanged, isClosedSidebar }: NavbarProps) => {
    const { userInvites, partnersList } = useAppSelector(selectTrainingPartners);

    const { pathname } = useLocation();

    const { isErr, handleClick, closeErrModal } = useCalendarClick();

    const isShowBadge = partnersList.length < MAX_NUMBER_WORKOUT_PARTNERS;

    const handleMenuItemsClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case Paths.CALENDAR:
                handleClick(Paths.CALENDAR);
                break;

            case Paths.WORKOUTS:
                handleClick(Paths.WORKOUTS);
                break;

            case Paths.ACHIEVEMENTS:
                handleClick(Paths.ACHIEVEMENTS);
                break;
        }
    };

    return (
        <Fragment>
            <Menu
                className={styles.wrapper}
                selectedKeys={[pathname]}
                mode='inline'
                onClick={handleMenuItemsClick}
                items={createMenuItemsArr(
                    isWidthChanged,
                    isClosedSidebar,
                    userInvites.length,
                    pathname,
                    isShowBadge,
                )}
            />
            <ModalWindow isOpen={isErr} dataTestId={DATA_TEST_ID.modalNoReview}>
                <RequestResult
                    keyErr={ResultRequestKeys.GET_FEEDBACK_ERR}
                    buttonsGroup={
                        <PrimaryBtn
                            type='primary'
                            htmlType='button'
                            className={styles.btn_err}
                            btnText='Назад'
                            onClick={closeErrModal}
                            dataTestId={DATA_TEST_ID.writeReviewNotSavedModal}
                        />
                    }
                />
            </ModalWindow>
        </Fragment>
    );
};
