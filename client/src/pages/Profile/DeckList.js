// Node Modules
import React from 'react';
import { useHistory } from "react-router-dom";
import { ListGroup, Button } from 'react-bootstrap'
import { EDIT_DECK } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const DeckList = (deck) => {
    const [editDeck, { error }] = useMutation(EDIT_DECK);
    let history = useHistory();
    if (error) console.log(error)

    const editDeckHandler = async () => {
        const { data } = await editDeck({
            variables: { deckId: deck._id }
        })
        let path = `/deck/${deck._id}`;
        history.push(path);
    }
    const renderButton = () => {
        if (deck.editable) {
            return (
                <>
                    <Button
                        className="mx-2"
                        variant="outline-light"
                        href={`/deck/${deck._id}`}
                    >
                        view
                    </Button>
                    <Button
                        className="mx-2"
                        variant="outline-light"
                        onClick={editDeckHandler}
                    >
                        edit
                    </Button>
                </>
            )
        } else {
            return (
                <Button
                    className="mx-2"
                    variant="outline-light"
                    href={`/deck/${deck._id}`}
                >
                    view
                </Button>
            )
        }
    }

    if (deck.editable) {
        return (
            <ListGroup.Item
                className="bg-dark" key={deck._id} id={deck._id}>
                <h1 className="text-light">{deck.name ? deck.name : 'New Deck'}</h1>
                {renderButton()}
            </ListGroup.Item>
        );
    } else {
        return (
            <ListGroup.Item
                className="bg-dark text-light p-2 m-3"
                id="bg-card"
                key={deck._id}>
                <h1 className="text-light">{deck.name ? deck.name : 'New Deck'}</h1>
                {renderButton()}
            </ListGroup.Item>
        )
    }
};

export default DeckList;