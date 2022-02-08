// Node Modules
import React from 'react';
import { ListGroup } from 'react-bootstrap'

const DeckList = ({ deck }) => {
    console.log("DECK: ", deck)

    const viewDeckDetails = (deck) => {
        // TODO: Get details of selected deck
    }

    return (
        <ListGroup.Item action onClick={viewDeckDetails}>
            {deck.name}
        </ListGroup.Item>
    );
};

export default DeckList;