import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callback: (currentTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [currentTitle, setCurrentTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value)

    }

    const onBlurHandler = () => {
        props.callback(currentTitle)
        setEditMode(false)
    }

    const onClickHandler = () => {
        setEditMode(true)
    }

    return (
        editMode
            ? <input value={currentTitle}
                     onChange={onChangeHandler}
                     onBlur={onBlurHandler}
                     autoFocus/>
            : <span onDoubleClick={onClickHandler}>{currentTitle}</span>
    );
};

