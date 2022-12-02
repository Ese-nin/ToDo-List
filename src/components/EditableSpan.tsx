import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";
import {AppStatusType} from "../state/app-reducer";

type EditableSpanPropsType = {
    title: string
    callback: (title: string) => void
    entityStatus: AppStatusType
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [currentTitle, setCurrentTitle] = useState(props.title)

    const setEditModeOn = () => {

        if (props.entityStatus === 'loading') {
            return
        }

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
});