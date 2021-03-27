import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import { useAuth } from '../../hooks/auth';
import { Logo } from './styles';

export function SignIn() {
    const { signIn } = useAuth();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    async function handleSignIn(event: FormEvent) {
        event.preventDefault();

        await signIn({ email, password });

        setEmail('');
        setPassword('');

        history.push('/dashboard');
    }

    function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)
    }

    function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <Logo>
                    <h1><b> Financial</b> Control</h1>
                </Logo>
                <CRow className="justify-content-center">
                    <CCol md="8">
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm onSubmit={handleSignIn}>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-user" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput
                                                type="text"
                                                placeholder="E-mail"
                                                autoComplete="email"
                                                value={email}
                                                onChange={handleEmail}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput
                                                type="password"
                                                placeholder="Senha"
                                                autoComplete="password"
                                                value={password}
                                                onChange={handlePassword}
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol sm={{ size: 12 }}>
                                                <CButton className="btn-square" type="submit" color="dark" size="lg" block>Entrar</CButton>
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
    );
}
