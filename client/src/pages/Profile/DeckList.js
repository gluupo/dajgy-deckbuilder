// Node Modules
import React from 'react';
import { ListGroup, Button } from 'react-bootstrap'
import { EDIT_DECK } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Card from '../../components/Card/MTGCard'

const DeckList = (deck) => {
    const [editDeck, { error, data }] = useMutation(EDIT_DECK);
    console.log("DECK: ", deck)

    const editDeckHandler = async () => {
        const { data } = await editDeck({
            variables: { deckId: deck._id }
        })
    }
    if (deck._id === deck.workingDeck) {
        return (
            <ListGroup.Item>
                <h1>{deck.name ? deck.name : 'New Deck'}</h1>
                <Button href={`/deck/${deck._id}`}>view</Button>
                <Button onClick={editDeckHandler}>edit</Button>
            </ListGroup.Item>
        );
    } else {
        return (
            <ListGroup.Item key={deck._id}>
                <h2>{deck.name ? deck.name : 'New Deck'}</h2>
                <Button href={`/deck/${deck._id}`}>view</Button>
                <Button onClick={editDeckHandler}>edit</Button>
            </ListGroup.Item>
        )
    }
};

export default DeckList;