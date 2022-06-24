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
import { FormEvent } from 'react';
import { useParams } from 'react-router-dom';

import { Params } from '../../models/params';
import { useToast } from '../../hooks/toast';
import { useBillItem } from '../../hooks/billItem';
import { CurrencyInput } from '../CurrencyInput';

export function NewBillItemModal() {
    const { id } = useParams<Params>();
    const { addToast } = useToast();
    const {
        billItemId,
        billItemInput,
        isNewBillItemModalOpen,
        handleChange,
        handleCurrencyChange,
        createBillItem,
        updateBillItem,
        handleCloseNewBillItemModal
    } = useBillItem();

    async function handleCreateNewBillItem(event: FormEvent) {
        event.preventDefault();
        billItemId ? await update() : await create();
        handleCloseNewBillItemModal();
    }

    async function create() {
        try {
            await createBillItem(id, billItemInput);
            addToast({ type: 'success', title: 'Successo', description: 'Cadastrado com sucesso' });
        } catch (error: any) {
            addToast({
                type: 'error',
                title: 'Erro ao cadastrar',
                description: error.response.data.error
            });
        }
    }

    async function update() {
        try {
            await updateBillItem(id, billItemId, billItemInput);
            addToast({ type: 'success', title: 'Successo', description: 'Editado com sucesso' });
        } catch (error: any) {
            addToast({
                type: 'error',
                title: 'Erro ao editar',
                description: error.response.data.error
            });
        }
    }

    return (
        <CModal show={isNewBillItemModalOpen}
            onClose={handleCloseNewBillItemModal}
        >
            <CModalHeader closeButton>
                <CModalTitle>Nova despesa</CModalTitle>
            </CModalHeader>
            <CForm onSubmit={handleCreateNewBillItem}>
                <CModalBody>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CLabel>Título</CLabel>
                            <CInput
                                type="text"
                                placeholder="Título"
                                name="title"
                                value={billItemInput.title ?? ''}
                                onChange={handleChange}
                            />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CLabel>Valor</CLabel>
                            <CurrencyInput
                                value={billItemInput.value}
                                handleCurrencyChange={handleCurrencyChange}
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
