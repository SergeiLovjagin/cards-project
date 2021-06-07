import React, {ChangeEvent, useEffect, useState} from 'react';
import {SuperInputText} from "../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {addPackThunk, CardPacksType, deletePackThunk, getPacksThunk} from "../../n1-main/m2-bll/packsReducer";
import {RootReducerType} from "../../n1-main/m2-bll/store";
import style from './Packs.module.css'
import {NavLink} from "react-router-dom";
import {PATH} from "../../n1-main/m1-ui/routes/Routes";
import {setCardsThunk} from "../../n1-main/m2-bll/cardsReducer";
import Pagination from 'rc-pagination';
import localeInfo from './../../locale/en_US'
import './Pagination.scss'
import MultiRangeSlider from './PacksSorting';
import Select from 'rc-select';
import './Rc-select.scss'


export const Packs = () => {

    // HOOKS
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPacksThunk())
    }, [dispatch])
    const packs = useSelector<RootReducerType, CardPacksType>(state => state.packs.packs)
    const [packName, setPackName] = useState('')
    const [privateFilter, setPrivateFilter] = useState<'all' | 'private'>('all')
    const cardPackTotalCount = useSelector<RootReducerType, number>(state => state.packs.cardPackTotalCount)
    const user_id = useSelector<RootReducerType, string | undefined>(state => state.profile.user?._id)

    // HANDLERS
    const handleAddPack = () => {
        dispatch(addPackThunk(packName))
        setPackName('')
    }
    const handleDeletePack = (packId: string) => {
        dispatch(deletePackThunk(packId))
    }
    const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
    }
    const handleOnLearnButton = (packId: string) => {
        dispatch(setCardsThunk(packId))
    }

    //FILTER HANDLERS
    const onChangeShowSize = (current: number, pageSize: number) => {
        dispatch(getPacksThunk({page: current, pageCount: pageSize}))
    }
    const onChangeMinMaxValues = (min: number, max: number) => {
        dispatch(getPacksThunk({min: min, max: max}))
    }
    const onChangePrivatePackFilter = (filter: string) => {
        if (user_id && filter === 'private') {
            setPrivateFilter("private")
            dispatch(getPacksThunk({user_id}))
        }
        if (filter === 'all') {
            setPrivateFilter("all")
            dispatch(getPacksThunk({user_id: ''}))
        }
    }


    return (
        <div>
            <MultiRangeSlider min={0} max={50} onChangeMinMaxValues={onChangeMinMaxValues}/>
            Number of cards
            <div>
                <SuperButton disabled={privateFilter === "private"} onClick={() => onChangePrivatePackFilter('private')}>My</SuperButton>
                <SuperButton disabled={privateFilter === "all"} onClick={() => onChangePrivatePackFilter('all')}>All</SuperButton>
            </div>
            <h1>Packs list</h1>
            <div>
                <SuperInputText onChange={handleChangeText} value={packName}/>
                <SuperButton onClick={handleAddPack}>Add new pack</SuperButton>
            </div>
            <div>
                {
                    packs.map((pack, index) => {
                        return (
                            <div className={style.packRow} key={index}>
                                <div>
                                    {pack.name}
                                </div>
                                <div>
                                    {pack.cardsCount}
                                </div>
                                <div>
                                    {pack.updated}
                                </div>
                                <div>
                                    {pack.user_name}
                                </div>
                                <div>
                                    <button onClick={() => handleDeletePack(pack._id)}>Delete</button>
                                </div>
                                <div>
                                    <NavLink to={PATH.CARDS} onClick={() => handleOnLearnButton(pack._id)}>Learn</NavLink>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Pagination
                selectComponentClass={Select}
                showQuickJumper
                showSizeChanger
                onShowSizeChange={onChangeShowSize}
                onChange={onChangeShowSize}
                total={cardPackTotalCount}
                locale={localeInfo}
                pageSizeOptions={['10', '20', '50']}
            />
        </div>
    )
}