import {
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CButton
} from '@coreui/react';

import { useAuth } from '../../hooks/auth';

export function HeaderDropdown() {
    const { user, signOut } = useAuth();
    return (
        <CDropdown inNav className="c-header-nav-items" >
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                <div>
                    <strong>{user.email}</strong>
                </div>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem>
                    <CButton color="link" onClick={signOut}>Sair</CButton>
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}
