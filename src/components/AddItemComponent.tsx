import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemPropsType = {
    callback: (title: string) => void
}

export const AddItem = (props: AddItemPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    const errorSpan = error ? <div className='error-message'>Field is empty</div> : ''

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
            <input value={title}
                   className={error ? 'error' : ''}
                   onChange={onChangeInputHandler}
                   onKeyDown={onEnterAddItem}/>
            <button onClick={addItemHandler}>+</button>
            {errorSpan}
        </div>
    );
};

