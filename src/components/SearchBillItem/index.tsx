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

import { useBillItem } from '../../hooks/billItem';

export function SearchBillItem() {
    const { handleOpenNewBillItemModal } = useBillItem();
    return (
        <CRow>
            <CCol xs="12" sm="12" md="12">
                <CCard>
                    <CCardHeader>Items de contas</CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol xs="4">
                                <CFormGroup>
                                    <CLabel>Despesas do mês</CLabel>
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
                                    onClick={handleOpenNewBillItemModal}
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
