import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_DECK_NAME } from "../../utils/mutations";

const InlineEditDeckName = ({ value, setValue }) => {
    const [updateDeckName, { error }] = useMutation(UPDATE_DECK_NAME)

    const [editingValue, setEditingValue] = useState(value);

    const onChange = (event) => setEditingValue(event.target.value);

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
            console.log("Value: ", value)
            updateDeckName({ variables: { deckName: event.target.value } })
        }
    }

    return (
        <input
            value={editingValue}
            aria-label="Deck name"
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
        />
    )
}

export default InlineEditDeckName;