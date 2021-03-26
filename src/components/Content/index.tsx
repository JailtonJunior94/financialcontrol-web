import { CContainer } from '@coreui/react'
import { ReactNode } from 'react';

interface ContentProps {
  children: ReactNode;
}

export function Content({ children }: ContentProps) {
  return (
    <CContainer fluid>
      {children}
    </CContainer>
  );
}