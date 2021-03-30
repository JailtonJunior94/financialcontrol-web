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

export function NewTransactionModal() {
    const { isNewTransactionModalOpen, handleCloseNewTransactionModal, createTransaction } = useTransaction();
    const [date, setDate] = useState('');

    function handleDate(e: React.ChangeEvent<HTMLInputElement>) {
        setDate(e.target.value)
    }

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({ date: new Date(date) });

        handleCloseNewTransactionModal();
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
