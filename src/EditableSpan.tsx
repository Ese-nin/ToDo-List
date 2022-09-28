import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callback: (currentTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [currentTitle, setCurrentTitle] = useState(props.title)

    const onBlurHandler = () => {
        setEditMode(false)
        props.callback(currentTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value)
    }

    const onDoubleClickHandler = () => {
        setEditMode(true)
    }

    return (
        editMode ?
            <input
                autoFocus
                value={currentTitle}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}/> :
            <span onDoubleClick={onDoubleClickHandler}>{currentTitle}</span>
    );
};