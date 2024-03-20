import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
    element: ReactNode;
    container: Element | DocumentFragment;
};

export const Portal = ({ element, container }: PortalProps) => createPortal(element, container);
