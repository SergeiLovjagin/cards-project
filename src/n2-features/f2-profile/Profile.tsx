import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../n1-main/m2-bll/store";
import {ProfileType} from "../../n1-main/m3-dal/api";
import {authMe, setError} from "../../n1-main/m2-bll/profileReducer";
import React, {useEffect} from "react";

export const Profile = () => {
    //HOOKS
    const user = useSelector<RootReducerType, ProfileType>(state => state.profile.user)
    const {loading, success, error} = useSelector<RootReducerType, { loading: boolean, success: boolean, error: string }>(state => state.profile);
    const dispatch = useDispatch()
    useEffect(() => {
        if (!success) {
            dispatch(authMe())
        }
        return function cleanup() {
            dispatch(setError(''))
        }
    }, [success, dispatch])

    return (
        <div>
            {loading && <div>LOADING......</div>}
            {error.length > 0 && <div>{error}</div>}
            {success &&
            <>
                Profile Page
                {Object.entries(user)
                    .map((el, index) => <div key={index}>{el[0]} : {el[1]}</div>)}
            </>
            }
        </div>
    )
}