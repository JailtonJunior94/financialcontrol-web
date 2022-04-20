import { useMemo } from 'react';
import {
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react';

import { useAuth } from '../../hooks/auth';

export function HeaderDropdown() {
    const { user, me } = useAuth()

    useMemo(() => {
        me()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <CDropdown inNav className="c-header-nav-items" >
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                <div>
                    <strong>{user.email}</strong>
                </div>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem>
                    <CIcon name="cil-bell" className="mfe-2" onClick={() => alert('eai')} />
                    Sair
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}
