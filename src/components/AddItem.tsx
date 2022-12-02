import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import Fingerprint from '@mui/icons-material/Fingerprint';
import {AppStatusType} from "../state/app-reducer";

type AddItemPropsType = {
    callback: (title: string) => void
    entityStatus?: AppStatusType
}

const AddItem = React.memo((props: AddItemPropsType) => {
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
        if (e.key === 'Enter') {
            addItem();
        }
    }

    return (
        <div>
            <TextField value={title}
                       error={!!error}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       label={error ? error : "Title"}
                       variant="standard"
                       disabled={props.entityStatus === 'loading'}/>
            <IconButton onClick={addItem}
                        aria-label="fingerprint"
                        color="success"
                        disabled={props.entityStatus === 'loading'}>
                <Fingerprint/>
            </IconButton>
        </div>
    );
});

export default AddItem;