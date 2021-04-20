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

import { useBill } from '../../hooks/bill';
import { useToast } from '../../hooks/toast';

export function NewBillModal() {
    const { addToast } = useToast();
    const [date, setDate] = useState('');
    const { isNewBillModalOpen, handleCloseNewBillModal, createBill } = useBill();

    function handleDate(e: React.ChangeEvent<HTMLInputElement>) {
        setDate(e.target.value)
    }

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        try {
            await createBill({ date: new Date(date) });

            addToast({
                type: 'success',
                title: 'Nova Conta do Mês',
                description: 'Conta do Mês cadastrada com sucesso'
            });

            setDate('');
            handleCloseNewBillModal();
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Erro ao cadastrar Conta do Mês',
                description: error.response.data.error
            });
        }
    }

    return (
        <CModal show={isNewBillModalOpen}
            onClose={handleCloseNewBillModal}
        >
            <CModalHeader closeButton>
                <CModalTitle>Nova conta do mês</CModalTitle>
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
