// Node Modules
import React from 'react';
import { ListGroup, Button } from 'react-bootstrap'
import { EDIT_DECK } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Card from '../../components/Card/Card'

const DeckList = (deck) => {
    const [editDeck, { error, data }] = useMutation(EDIT_DECK);
    console.log("DECK: ", deck)

    const viewDeckDetails = (deck) => {
        // TODO: Get details of selected deck
    }

    const editDeckHandler = async () => {
        const { data } = await editDeck({
            variables: { deckId: deck._id }
        })
    }

    return (
        <ListGroup.Item>
            {deck.name}
            {deck.cards.map(e =>
                < Card
                    multiverseid={e.multiverseid}
                    name={e.name}
                    manaCost={e.manaCost}
                    superTypes={e.superTypes}
                    rarity={e.rarity}
                    imageUrl={e.imageUrl}
                    text={e.text}
                />)}
            <Button onClick={viewDeckDetails}>view</Button>
            <Button onClick={editDeckHandler}>edit</Button>
        </ListGroup.Item>
    );
};

export default DeckList;