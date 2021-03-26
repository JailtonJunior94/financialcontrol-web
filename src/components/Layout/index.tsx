import { ReactNode } from 'react';

import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
import { Content } from '../Content';
import { Footer } from '../Footer';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="c-app c-default-layout">
            <Sidebar />
            <div className="c-wrapper">
                <Header />
                <div className="c-body">
                    <Content>
                        {children}
                    </Content>
                </div>
                <Footer />
            </div>
        </div>
    );
}
