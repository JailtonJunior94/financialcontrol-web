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
    CForm,
    CTextarea
} from '@coreui/react';
import { FormEvent } from 'react';
import Select from 'react-select';

import { useCard } from '../../hooks/card';
import { useToast } from '../../hooks/toast';
import { CurrencyInput } from '../CurrencyInput';
import { useInvoice } from '../../hooks/invoices';

export function NewInvoiceModal() {
    const { addToast } = useToast();
    const { cards } = useCard();
    const {
        categories,
        invoiceInput,
        isNewInvoiceModalOpen,
        handleChange,
        handleSelect,
        createInvoice,
        handleCurrencyChange,
        handleCloseNewInvoiceModal,
    } = useInvoice();

    async function handleCreateNewInvoice(event: FormEvent) {
        event.preventDefault();
        try {
            await createInvoice({
                cardId: invoiceInput.cardId,
                categoryId: invoiceInput.categoryId,
                purchaseDate: new Date(invoiceInput.purchaseDate),
                totalAmount: invoiceInput.totalAmount,
                quantityInvoice: Number(invoiceInput.quantityInvoice),
                description: invoiceInput.description,
                tags: invoiceInput.tags
            });

            addToast({
                type: 'success',
                title: 'Nova Compra cadastrada',
                description: 'Compra cadastrada com sucesso'
            });

            handleCloseNewInvoiceModal();
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Erro ao cadastrar Compra',
                description: error.response.data.error
            });
        }
    }

    const cardOptions = cards.map(card => { return { value: card.id, label: card.name } })
    const categoriesOptions = categories.map(category => { return { value: category.id, label: category.name } })
    return (
        <CModal show={isNewInvoiceModalOpen}
            onClose={handleCloseNewInvoiceModal}
        >
            <CModalHeader closeButton>
                <CModalTitle>Nova Compra</CModalTitle>
            </CModalHeader>
            <CForm onSubmit={handleCreateNewInvoice}>
                <CModalBody>
                    <CFormGroup row>
                        <CCol xs="12" md="6">
                            <CLabel>Data da Compra</CLabel>
                            <CInput
                                type="date"
                                name="purchaseDate"
                                placeholder="Data da Compra..."
                                onChange={handleChange}
                            />
                        </CCol>
                        <CCol xs="12" md="6">
                            <CLabel>Valor da Compra (Total)</CLabel>
                            <CurrencyInput
                                value={invoiceInput.totalAmount}
                                handleCurrencyChange={handleCurrencyChange}
                            />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="6">
                            <CLabel>Quantidade de Parcelas</CLabel>
                            <CInput
                                type="number"
                                placeholder="Parcelas..."
                                name="quantityInvoice"
                                value={invoiceInput.quantityInvoice ?? ''}
                                onChange={handleChange}
                            />
                        </CCol>
                        <CCol xs="12" md="6">
                            <CLabel>Cartão</CLabel>
                            <Select
                                placeholder="Selecione..."
                                options={cardOptions}
                                name='cardId'
                                onChange={(e => handleSelect({ value: e?.value ?? '', name: 'cardId' }))}
                            />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="6">
                            <CLabel>Categoria</CLabel>
                            <Select
                                placeholder="Selecione..."
                                options={categoriesOptions}
                                name='categoryId'
                                onChange={(e => handleSelect({ value: e?.value ?? '', name: 'categoryId' }))}
                            />
                        </CCol>
                        <CCol xs="12" md="6">
                            <CLabel>Tags</CLabel>
                            <CInput
                                type="text"
                                placeholder="Tags..."
                                name="tags"
                                value={invoiceInput.tags ?? ''}
                                onChange={handleChange}
                            />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CLabel>Descrição</CLabel>
                            <CTextarea
                                type="text"
                                placeholder="Descrição..."
                                name="description"
                                value={invoiceInput.description ?? ''}
                                onChange={handleChange}
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
