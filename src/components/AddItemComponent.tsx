import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import Fingerprint from "@mui/icons-material/Fingerprint";

type AddItemPropsType = {
    callback: (title: string) => void
}

export const AddItem = (props: AddItemPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    const errorSpan = error ? <span className='error-message'>Field is empty</span> : ''

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false)
        setTitle(e.currentTarget.value)
    }

    const onEnterAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addItemHandler()
    }

    const addItemHandler = () => {
        if (title.trim()) {
            props.callback(title.trim())
            setTitle('')
        } else setError(true)
    }

    return (
        <div>
            <TextField
                label={error ? errorSpan : 'Enter new title'}
                value={title}
                className={error ? 'error' : ''}
                onChange={onChangeInputHandler}
                onKeyDown={onEnterAddItem}
                variant="filled"
                size={'small'}/>
            <IconButton onClick={addItemHandler} aria-label="fingerprint" color="success">
                <Fingerprint />
            </IconButton>
        </div>
    );
};

