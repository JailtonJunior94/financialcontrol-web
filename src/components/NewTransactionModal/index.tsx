import {
    CModal,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
    CModalHeader,
    CFormGroup,
    CCol,
    CLabel,
    CInput,
    CForm
} from '@coreui/react';
import { FormEvent, useState } from 'react';

import { useTransaction } from '../../hooks/transaction';
import { useToast } from '../../hooks/toast';

export function NewTransactionModal() {
    const { addToast } = useToast();
    const [date, setDate] = useState('');
    const { isNewTransactionModalOpen, handleCloseNewTransactionModal, createTransaction } = useTransaction();

    function handleDate(e: React.ChangeEvent<HTMLInputElement>) {
        setDate(e.target.value)
    }

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        try {
            await createTransaction({ date: new Date(date) });

            addToast({
                type: 'success',
                title: 'Nova transação',
                description: 'Transação cadastrada com sucesso'
            });

            setDate('');
            handleCloseNewTransactionModal();
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Erro ao cadastrar transação',
                description: error.response.data.error
            });
        }
    }

    return (
        <CModal show={isNewTransactionModalOpen}
            onClose={handleCloseNewTransactionModal}
        >
            <CModalHeader closeButton>
                <CModalTitle>Nova transação</CModalTitle>
            </CModalHeader>
            <CForm onSubmit={handleCreateNewTransaction}>
                <CModalBody>
                    <CFormGroup row>
                        <CCol xs="12" md="8">
                            <CLabel htmlFor="date-input">Mês</CLabel>
                            <CInput
                                type="date"
                                id="date-input"
                                name="date-input"
                                placeholder="date"
                                value={date}
                                onChange={handleDate}
                            />
                        </CCol>
                    </CFormGroup>
                </CModalBody>
                <CModalFooter>
                    <CButton
                        type="submit"
                        className='btn-square'
                        color="info"
                        block>Salvar
                </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
}
