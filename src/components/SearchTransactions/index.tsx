import { useState } from 'react';
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
    CSelect,

    CLink
} from '@coreui/react';
import CIcon from '@coreui/icons-react'

export function SearchTransactions() {
    const [collapsed, setCollapsed] = useState(true)
    return (
        <CRow>
            <CCol xs="12" sm="12" md="12">
                <CCard>
                    <CCardHeader>Transações
                    <CLink className="card-header-action" onClick={() => setCollapsed(!collapsed)}>
                            <CIcon name={collapsed ? 'cil-chevron-bottom' : 'cil-chevron-top'} />
                        </CLink>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol xs="4">
                                <CFormGroup>
                                    <CLabel>Meses</CLabel>
                                    <CSelect size="lg" name="selectLg" id="selectLg">
                                        <option value="0">Please select</option>
                                        <option value="1">Option #1</option>
                                        <option value="2">Option #2</option>
                                        <option value="3">Option #3</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter>
                        <CRow className="d-flex justify-content-end">
                            <CCol xs="2" sm="2" md="2">
                                <CButton
                                    className='btn-square'
                                    type='submit'
                                    color="info" block><i className='fa fa-plus'></i> Novo mês
                                </CButton>
                            </CCol>
                            <CCol xs="2" sm="2" md="2">
                                <CButton
                                    className='btn-square'
                                    type='submit'
                                    color="secondary" block><i className='fa fa-plus'></i> Pesquisar
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    );
}