import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import Fingerprint from '@mui/icons-material/Fingerprint';

type AddItemPropsType = {
    callback: (title: string) => void
}

const AddItem = (props: AddItemPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callback(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return (
        <div>
            <TextField value={title}
                       error={!!error}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       label={error ? error : "Title"}
                       variant="standard" />
            <IconButton onClick={addItem} aria-label="fingerprint" color="success">
                <Fingerprint />
            </IconButton>
        </div>
    );
};

export default AddItem;