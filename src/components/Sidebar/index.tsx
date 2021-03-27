import { useState } from 'react';

import {
    CSidebar,
    CSidebarMinimizer,
    CCreateElement,
    CSidebarNav,
    CSidebarNavDivider,
    CSidebarNavDropdown,
    CSidebarNavItem,
    CSidebarNavTitle,
    CSidebarBrand
} from '@coreui/react';
import CIcon from '@coreui/icons-react'

import navigation from '../../routes/navigation';

export function Sidebar() {
    const [isshow, setIsShow] = useState(true);
    return (
        <CSidebar
            show={isshow}
            onShowChange={(val: boolean | ((prevState: boolean) => boolean)) => setIsShow(val)}
        >
            <CSidebarBrand className="d-md-down-none" to="/">
                <CIcon
                    className="c-sidebar-brand-full"
                    name={"logo-negative"}
                    height={35}
                />
                <CIcon
                    className="c-sidebar-brand-minimized"
                    name={"sygnet"}
                    height={35}
                />
            </CSidebarBrand>
            <CSidebarNav>
                <CCreateElement
                    items={navigation}
                    components={{
                        CSidebarNavDivider,
                        CSidebarNavDropdown,
                        CSidebarNavItem,
                        CSidebarNavTitle
                    }}
                />
            </CSidebarNav>
            <CSidebarMinimizer className="c-d-md-down-none" />
        </CSidebar>
    );
}
