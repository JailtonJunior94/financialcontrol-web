import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow
} from '@coreui/react';

import { Card } from '../../models/cards';
import { formatDate } from '../../utils/formats';

interface CardsTableProps {
    cards: Card[]
}

export function CardsTable({ cards }: CardsTableProps) {
    const fields = ['name', 'descrição', 'numero', 'fechamento (Dia)', 'data de expiração', 'bandeira do cartão']

    const items = cards.map(card => {
        return {
            id: card.id,
            'name': card.name,
            'descrição': card.description,
            'numero': card.number,
            'fechamento (Dia)': card.closingDay,
            'data de expiração': formatDate(card.expirationDate),
            'bandeira do cartão': card.flag.name
        }
    })

    return (
        <CRow>
            <CCol xs="12" lg="12">
                <CCard>
                    <CCardBody>
                        <CDataTable
                            clickableRows
                            hover
                            responsive
                            striped
                            pagination
                            items={items}
                            fields={fields}
                            itemsPerPage={10}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
