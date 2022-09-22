import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callback: (currentTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [currentTitle, setCurrentTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)

    const spanClickHandler = () => {
        setEditMode(true)
    }

    const onBlurHandler = () => {
        setEditMode(false)
        props.callback(currentTitle)
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value)
    }

    return (
        editMode ? <input value={currentTitle}
                          onChange={onChangeInputHandler}
                          onBlur={onBlurHandler}
                          autoFocus/> :
            <span onDoubleClick={spanClickHandler}>{props.title}</span>
    );
};