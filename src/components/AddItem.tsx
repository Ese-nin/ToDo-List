import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemPropsType = {
    addItem: (value: string) => void
}

export const AddItem = (props: AddItemPropsType) => {

    const [value, setValue] = useState("")
    const [error, setError] = useState(false)

    const errorMessage = error ? <div className={'error-message'}>Field empty</div> : false

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false)
        setValue(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addTaskButtonHandler()
    }

    const addTaskButtonHandler = () => {
        if (value.trim() !== "") {
            props.addItem(value)
            setValue("")
        } else setError(true)
    }

    return (
        <div>
            <input
                className={error ? "error" : ""}
                value={value}
                onChange={onChangeInputHandler}
                onKeyDown={onKeyDownHandler}/>
            <button onClick={addTaskButtonHandler}>+</button>
            {errorMessage}
        </div>
    );
};