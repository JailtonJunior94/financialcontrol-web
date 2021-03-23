import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

export default function Login() {
    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="8">
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-user" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="text" placeholder="E-mail" autoComplete="email" />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="password" placeholder="Senha" autoComplete="password" />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs="12">
                                                <CButton color="dark" size="lg" className="btn-square">Entrar</CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}