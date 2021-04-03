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
    CInput
} from '@coreui/react';

import { useTransactionItem } from '../../hooks/transactionItem';

export function SearchTransactionItem() {
    const { handleOpenNewTransactionItemModal } = useTransactionItem();
    return (
        <CRow>
            <CCol xs="12" sm="12" md="12">
                <CCard>
                    <CCardHeader>Transações itens</CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol xs="4">
                                <CFormGroup>
                                    <CLabel>Transação</CLabel>
                                    <CInput
                                        label="lg"
                                        placeholder="Pesquisar..."
                                    >
                                    </CInput>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter>
                        <CRow className="d-flex justify-content-end">
                            <CCol xs="2" sm="2" md="2">
                                <CButton
                                    onClick={handleOpenNewTransactionItemModal}
                                    className='btn-square'
                                    type='submit'
                                    color="info" block><i className='fa fa-plus'></i> Novo
                                </CButton>
                            </CCol>
                            <CCol xs="2" sm="2" md="2">
                                <CButton
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
