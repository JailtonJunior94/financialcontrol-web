import { useEffect, useState } from 'react';
import { CSpinner, CAlert } from '@coreui/react';

import { Layout } from '../../components/Layout';
import { SearchCard } from '../../components/SearchCard';
import { CardsTable } from '../../components/CardsTable';
import { NewCardModal } from '../../components/NewCardModal';
import { useCard } from '../../hooks/card';

export function Cards() {
    const [isLoading, setIsLoading] = useState(true);
    const { cards, loadCards, loadFlags } = useCard();

    useEffect(() => {
        loadCards();
        loadFlags();
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout>
            <SearchCard />
            {cards.length !== 0 && (
                <CardsTable cards={cards} />
            )}
            {cards.length === 0 && (
                <CAlert color="warning" closeButton>Nenhum item encontrado!</CAlert>
            )}
            {isLoading &&
                <CSpinner
                    color="primary"
                    style={{ width: '7rem', height: '7rem', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                />
            }
            <NewCardModal />
        </Layout>
    );
}
