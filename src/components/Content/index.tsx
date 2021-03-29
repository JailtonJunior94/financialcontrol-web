import { CContainer } from '@coreui/react';
import React, { ReactNode } from 'react';

interface ContentProps {
  children: ReactNode;
}

export function Content({ children }: ContentProps) {
  return (
    <main className="c-main">
      <CContainer fluid>
        {children}
      </CContainer>
    </main>
  );
}
