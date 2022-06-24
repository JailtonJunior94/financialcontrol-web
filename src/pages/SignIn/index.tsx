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
import { freeSet } from '@coreui/icons';

import { Logo } from './styles';
import { SignInInput, useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

export function SignIn() {
    const [input, setInput] = useState<SignInInput>({} as SignInInput);
    const history = useHistory();
    const { signIn } = useAuth();
    const { addToast } = useToast();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSignIn(event: FormEvent) {
        try {
            event.preventDefault();

            await signIn(input);

            setInput({} as SignInInput)

            history.push('/dashboard');
        } catch (error: any) {
            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: error.response.data.error
            });
        }
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
                                                    <CIcon content={freeSet.cilUser} />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput
                                                type="text"
                                                name="email"
                                                placeholder="E-mail"
                                                onChange={handleChange}
                                                defaultValue={input.email}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon content={freeSet.cilLockLocked} />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput
                                                type="password"
                                                name="password"
                                                placeholder="Senha"
                                                onChange={handleChange}
                                                defaultValue={input.password}
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
