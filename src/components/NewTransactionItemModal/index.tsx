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
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useToast } from '../../hooks/toast';
import { useTransaction } from '../../hooks/transaction';
import { TransactionTypeContainer, RadioBox } from './styles';

export function NewTransactionItemModal() {
    const { id } = useParams<Params>();
    const { addToast } = useToast();
    const {
        type,
        title,
        value,
        itemId,
        isNewTransactionItemModalOpen,
        handleType,
        handleTitle,
        handleValue,
        createTransactionItem,
        updateTransactionItem,
        handleCloseNewTransactionItemModal
    } = useTransaction();

    async function handleCreateNewTransactionItem(event: FormEvent) {
        event.preventDefault();

        if (itemId) {
            await update();
            return;
        }

        await create();
    }

    async function create() {
        try {
            await createTransactionItem(id, {
                title,
                value,
                type
            });

            addToast({ type: 'success', title: 'Successo', description: 'Cadastrado com sucesso' });

            handleCloseNewTransactionItemModal();
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Erro ao cadastrar',
                description: error.response.data.error
            });
        }
    }

    async function update() {
        try {
            await updateTransactionItem(id, itemId, {
                title,
                value,
                type
            });

            addToast({ type: 'success', title: 'Successo', description: 'Editado com sucesso' });

            handleCloseNewTransactionItemModal();
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Erro ao editar',
                description: error.response.data.error
            });
        }
    }

    return (
        <CModal show={isNewTransactionItemModalOpen}
            onClose={handleCloseNewTransactionItemModal}
        >
            <CModalHeader closeButton>
                <CModalTitle>Nova transação</CModalTitle>
            </CModalHeader>
            <CForm onSubmit={handleCreateNewTransactionItem}>
                <CModalBody>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CLabel>Título</CLabel>
                            <CInput
                                type="text"
                                placeholder="Título"
                                value={title}
                                onChange={handleTitle}
                            />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CLabel>Valor</CLabel>
                            <CInput
                                defaultValue={0}
                                type="text"
                                placeholder="Valor"
                                value={value}
                                onChange={handleValue}
                            />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <TransactionTypeContainer>
                                <RadioBox
                                    type="button"
                                    onClick={() => handleType('INCOME')}
                                    isActive={type === 'INCOME'}
                                    activeColor="green"
                                >
                                    <img src={incomeImg} alt="Entrada" />
                                    <span>Entrada</span>
                                </RadioBox>
                                <RadioBox
                                    type="button"
                                    onClick={() => handleType('OUTCOME')}
                                    isActive={type === 'OUTCOME'}
                                    activeColor="red"
                                >
                                    <img src={outcomeImg} alt="Saída" />
                                    <span>Saída</span>
                                </RadioBox>
                            </TransactionTypeContainer>
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
