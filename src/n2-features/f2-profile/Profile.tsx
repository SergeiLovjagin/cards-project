import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../n1-main/m2-bll/store";
import {ProfileType} from "../../n1-main/m3-dal/api";
import {authMe} from "../../n1-main/m2-bll/profileReducer";
import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";
import {PATH} from "../../n1-main/m1-ui/routes/Routes";

export const Profile = () => {
    //HOOKS
    const user = useSelector<RootReducerType, ProfileType>(state => state.profile.user)
    const {loading, success, profileError} = useSelector<RootReducerType, { loading: boolean, success: boolean, profileError: string}>(state => state.profile);
    const user_id = useSelector<RootReducerType,string>(state => state.profile.user._id)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user_id === undefined) {
            dispatch(authMe())
        }
    }, [user_id])

    if (success && user_id === undefined) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div>
            {loading && <div>LOADING......</div>}
            {profileError.length > 0 && <div>{profileError}</div>}
            {success && user_id &&
            <>
                Profile Page
                {Object.entries(user)
                    .map((el, index) => <div key={index}>{el[0]} : {el[1]}</div>)}
            </>
            }
        </div>
    )
}