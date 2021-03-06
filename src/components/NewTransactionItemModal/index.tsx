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
import { TransactionTypeContainer, RadioBox } from './styles';
import { useTransactionItem } from '../../hooks/transactionItem';
import { CurrencyInput } from '../CurrencyInput';

export function NewTransactionItemModal() {
    const { id } = useParams<Params>();
    const { addToast } = useToast();
    const {
        transactionItemId,
        transactionItemInput,
        isNewTransactionItemModalOpen,
        handleChange,
        handleRadioClick,
        handleCurrencyChange,
        createTransactionItem,
        updateTransactionItem,
        handleCloseNewTransactionItemModal
    } = useTransactionItem();

    async function handleCreateNewTransactionItem(event: FormEvent) {
        event.preventDefault();
        transactionItemId ? await update() : await create();
        handleCloseNewTransactionItemModal();
    }

    async function create() {
        try {
            await createTransactionItem(id, transactionItemInput);
            addToast({ type: 'success', title: 'Successo', description: 'Cadastrado com sucesso' });
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
            await updateTransactionItem(id, transactionItemId, transactionItemInput);
            addToast({ type: 'success', title: 'Successo', description: 'Editado com sucesso' });
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
                <CModalTitle>Nova transa????o</CModalTitle>
            </CModalHeader>
            <CForm onSubmit={handleCreateNewTransactionItem}>
                <CModalBody>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CLabel>T??tulo</CLabel>
                            <CInput
                                type="text"
                                placeholder="T??tulo"
                                name="title"
                                value={transactionItemInput.title ?? ''}
                                onChange={handleChange}
                            />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CLabel>Valor</CLabel>
                            <CurrencyInput
                                value={transactionItemInput.value}
                                handleCurrencyChange={handleCurrencyChange}
                            />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <TransactionTypeContainer>
                                <RadioBox
                                    name="type"
                                    type="button"
                                    activeColor="green"
                                    isActive={transactionItemInput.type === 'INCOME'}
                                    value={transactionItemInput.type ?? 'INCOME'}
                                    onClick={() => handleRadioClick('INCOME')}
                                >
                                    <img src={incomeImg} alt="Entrada" />
                                    <span>Entrada</span>
                                </RadioBox>
                                <RadioBox
                                    name="type"
                                    type="button"
                                    activeColor="red"
                                    isActive={transactionItemInput.type === 'OUTCOME'}
                                    value={transactionItemInput.type ?? 'OUTCOME'}
                                    onClick={() => handleRadioClick('OUTCOME')}
                                >
                                    <img src={outcomeImg} alt="Sa??da" />
                                    <span>Sa??da</span>
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
