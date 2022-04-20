import { CHeader, CHeaderNav } from '@coreui/react';

import { HeaderDropdown } from '../HeaderDropdown';

export function Header() {
    return (
        <CHeader>
            <CHeaderNav className="d-md-down-none mr-auto"></CHeaderNav>
            <CHeaderNav>
                <HeaderDropdown />
            </CHeaderNav>
        </CHeader>
    );
}
