import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CCardFooter,
    CButton,
    CFormGroup,
    CLabel,
} from '@coreui/react';
import { useState } from 'react';
import Select from 'react-select';

import { useCard } from '../../hooks/card';
import { useToast } from '../../hooks/toast';
import { useInvoice } from '../../hooks/invoices';

export function SearchInvoices() {
    const { cards } = useCard()
    const { addToast } = useToast()
    const { loadInvoices, handleIsLoading, handleOpenNewInvoiceModal } = useInvoice();
    const [cardId, setCardId] = useState('')

    function handleSelect(e: any) {
        setCardId(e.value)
    }

    async function handleSearchInvoices() {
        if (cardId === '') {
            addToast({
                type: 'error',
                title: 'Campo obrigatório',
                description: 'Favor informar o cartão'
            });
            return
        }

        handleIsLoading(true)
        await loadInvoices(cardId)
        handleIsLoading(false)
    }

    const options = cards.map(card => { return { value: card.id, label: card.name } })
    return (
        <CRow>
            <CCol xs="12" sm="12" md="12">
                <CCard>
                    <CCardHeader>Faturas</CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol xs="4">
                                <CFormGroup>
                                    <CLabel>Cartões</CLabel>
                                    <Select
                                        placeholder="Selecione..."
                                        options={options}
                                        name='flagId'
                                        onChange={(e => handleSelect({ value: e?.value ?? '' }))}
                                    />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter>
                        <CRow className="d-flex justify-content-end">
                            <CCol xs="2" sm="2" md="2">
                                <CButton
                                    onClick={handleOpenNewInvoiceModal}
                                    className='btn-square'
                                    type='button'
                                    color="info" block><i className='fa fa-plus'></i> Novo
                                </CButton>
                            </CCol>
                            <CCol xs="2" sm="2" md="2">
                                <CButton
                                    onClick={handleSearchInvoices}
                                    className='btn-square'
                                    type='submit'
                                    color="secondary" block><i className='fa fa-search'></i> Pesquisar
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    );
}
