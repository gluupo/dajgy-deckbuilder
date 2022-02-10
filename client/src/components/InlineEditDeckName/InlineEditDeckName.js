import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_DECK_NAME } from "../../utils/mutations";
import './assets/styles.css';

const InlineEditDeckName = ({ value, setValue, editable }) => {
    const [updateDeckName, { error }] = useMutation(UPDATE_DECK_NAME)

    const [editingValue, setEditingValue] = useState(value);

    const onChange = (event) => setEditingValue(event.target.value);

    if (error) console.log(error);

    const onKeyDown = (event) => {
        if (event.key === "Enter" || event.key === "Escape") {
            event.target.blur();

        }
    }

    const onBlur = (event) => {
        if (event.target.value.trim() === "") {
            setValue(value);
        } else {
            setValue(event.target.value)
            updateDeckName({ variables: { deckName: event.target.value } })
        }
    }
    if (!editable) {
        return <h2 id='deckName'>{value}</h2>
    }
    return (
        <textarea
            id='deckName'
            value={editingValue}
            aria-label="Deck name"
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            maxLength='32'
        />
    )
}

export default InlineEditDeckName; 