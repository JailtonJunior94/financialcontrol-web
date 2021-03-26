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

import navigation from '../../routes/navigation';

export function Sidebar() {
    const [isshow, setIsShow] = useState(true);
    return (
        <CSidebar
            show={isshow}
            onShowChange={(val: boolean | ((prevState: boolean) => boolean)) => setIsShow(val)}
        >
            <CSidebarBrand className="d-md-down-none" to="/">
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
