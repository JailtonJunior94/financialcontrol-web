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
import Select from 'react-select';

import { useCard } from '../../hooks/card';
import { useToast } from '../../hooks/toast';

export function NewCardModal() {
    const { addToast } = useToast();
    const {
        flags,
        cardInput,
        isNewCardModalOpen,
        handleCloseNewCardModal,
        createCard,
        handleChange,
        handleSelect
    } = useCard();

    async function handleCreateNewCard(event: FormEvent) {
        event.preventDefault();
        try {
            await createCard({
                flagId: cardInput.flagId,
                name: cardInput.name,
                number: cardInput.number,
                description: cardInput.description,
                closingDay: Number(cardInput.closingDay),
                expirationDate: new Date(cardInput.expirationDate)
            });

            addToast({
                type: 'success',
                title: 'Novo Cartão',
                description: 'Cartão cadastrado com sucesso'
            });

            handleCloseNewCardModal();
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Erro ao cadastrar Cartão',
                description: error.response.data.error
            });
        }
    }

    const options = flags.map(flag => { return { value: flag.id, label: flag.name } })
    return (
        <CModal show={isNewCardModalOpen}
            onClose={handleCloseNewCardModal}
        >
            <CModalHeader closeButton>
                <CModalTitle>Novo Cartão</CModalTitle>
            </CModalHeader>
            <CForm onSubmit={handleCreateNewCard}>
                <CModalBody>
                    <CFormGroup row>
                        <CCol xs="12" md="6">
                            <CLabel>Nome</CLabel>
                            <CInput
                                type="text"
                                placeholder="Nome..."
                                name="name"
                                value={cardInput.name ?? ''}
                                onChange={handleChange}
                            />
                        </CCol>
                        <CCol xs="12" md="6">
                            <CLabel>Número do Cartão</CLabel>
                            <CInput
                                type="text"
                                placeholder="Últimos 4 digitos..."
                                name="number"
                                value={cardInput.number ?? ''}
                                onChange={handleChange}
                            />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="6">
                            <CLabel>Descrição</CLabel>
                            <CInput
                                type="text"
                                placeholder="Descrição..."
                                name="description"
                                value={cardInput.description ?? ''}
                                onChange={handleChange}
                            />
                        </CCol>
                        <CCol xs="12" md="6">
                            <CLabel>Dia do Fechamento (Fatura)</CLabel>
                            <CInput
                                type="number"
                                placeholder="Dia (1 a 31)..."
                                name="closingDay"
                                value={cardInput.closingDay ?? 0}
                                onChange={handleChange}
                            />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="6">
                            <CLabel>Bandeira do Cartão</CLabel>
                            <Select
                                placeholder="Selecione..."
                                options={options}
                                name='flagId'
                                onChange={(e => handleSelect({ value: e?.value ?? '', name: 'flagId' }))}
                            />
                        </CCol>
                        <CCol xs="12" md="6">
                            <CLabel>Data de Expiração (Cartão)</CLabel>
                            <CInput
                                type="date"
                                name="expirationDate"
                                placeholder="Data de Expiração..."
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
