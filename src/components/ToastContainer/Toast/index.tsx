import { useEffect } from 'react';
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';

import { ToastMessage, useToast } from '../../../hooks/toast';
import { Container } from './styles';

interface ToastProps {
    message: ToastMessage;
    style: object;
}

const icons = {
    info: <CIcon content={freeSet.cilInfo} />,
    success: <CIcon content={freeSet.cilCheckCircle} />,
    error: <CIcon content={freeSet.cilBan} />
}

export function Toast({ message, style }: ToastProps) {
    const { removeToast } = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(message.id);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [removeToast, message.id]);

    return (
        <Container type={message.type} style={style}>
            {icons[message.type]}
            <div>
                <strong>{message.title}</strong>
                <p>{message.description}</p>
            </div>
            <button type="button" onClick={() => removeToast(message.id)}>
                <CIcon content={freeSet.cilTrash} />
            </button>
        </Container>
    );
}
