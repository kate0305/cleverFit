import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, MenuProps } from 'antd';
import { selectUserInvites } from '@redux/redusers/training-partners-slice';

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
    const userInvites = useAppSelector(selectUserInvites);

    const { pathname } = useLocation();

    const { isErr, handleClick, closeErrModal } = useCalendarClick();

    const handleMenuItemsClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case Paths.CALENDAR:
                handleClick(Paths.CALENDAR);
                break;

            case Paths.WORKOUTS:
                handleClick(Paths.WORKOUTS);
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
                )}
            />
            <ModalWindow isOpen={isErr} dataTestId='modal-no-review'>
                <RequestResult
                    keyErr={ResultRequestKeys.GET_FEEDBACK_ERR}
                    buttonsGroup={
                        <PrimaryBtn
                            type='primary'
                            htmlType='button'
                            className={styles.btn_err}
                            btnText='Назад'
                            onClick={closeErrModal}
                            dataTestId='write-review-not-saved-modal'
                        />
                    }
                />
            </ModalWindow>
        </Fragment>
    );
};
