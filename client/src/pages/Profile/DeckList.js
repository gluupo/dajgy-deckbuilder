// Node Modules
import React from 'react';
import { useHistory } from "react-router-dom";
import { Button, Col } from 'react-bootstrap'
import { EDIT_DECK } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const DeckList = (deck) => {
    const [editDeck, { error }] = useMutation(EDIT_DECK);
    let history = useHistory();
    if (error) console.log(error)
    console.log(deck)

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
            <Col
                xs={12} md={4}
                className="bg-dark text-center justify-content-center text-light p-5 m-3 rounded-3"
                key={deck._id}
                id={deck._id}>
                <h1 className="text-light">
                    {deck.name ? deck.name : 'New Deck'}
                    <p>
                        {renderButton()}
                    </p>
                </h1>
                <img
                    src='https://i.redd.it/qnnotlcehu731.jpg'
                    id='deckCard'
                    style={{ maxWidth: '8rem' }}
                />
            </Col>
        );
    } else {
        return (
            <Col
                xs={12} md={4}
                className="bg-dark text-center justify-content-center text-light p-5 m-3 rounded-3"
                id="bg-card"
                key={deck._id}>
                <h1 className="text-light">
                    {deck.name ? deck.name : 'New Deck'}
                    <p>
                        {renderButton()}
                    </p>
                </h1>
                <img
                    src='https://i.redd.it/qnnotlcehu731.jpg'
                    id='deckCard'
                    style={{ maxWidth: '8rem' }}
                />
            </Col>
        )
    }
};

export default DeckList;