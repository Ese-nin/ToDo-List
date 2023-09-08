import {useAppDispatch} from "store/store";
import {useMemo} from "react";
import {ActionCreatorsMapObject, bindActionCreators} from "redux";


export function useActions<T extends ActionCreatorsMapObject>(actions: T) {
    const dispatch = useAppDispatch()

    return useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])
}