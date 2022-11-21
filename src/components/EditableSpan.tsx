import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    callback: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [currentTitle, setCurrentTitle] = useState(props.title)

    const setEditModeOn = () => {
        setEditMode(true)
    }

    const setEditModeOff = () => {
        setEditMode(false)
        props.callback(currentTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField size="small"
                         label="Title"
                         variant="outlined"
                         onBlur={setEditModeOff}
                         value={currentTitle}
                         onChange={onChangeHandler}
                         autoFocus/>
            : <span onDoubleClick={setEditModeOn}>{currentTitle}</span>
    );
};