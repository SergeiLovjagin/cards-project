import React from 'react';
import {SuperInputText} from "../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../n1-main/m2-bll/store";
import {OneCardType} from "../../n1-main/m3-dal/api";
import {PopUp} from "../../n1-main/m1-ui/common/utills/modal-popUp/PopUp";
import {deleteCardThunk, openPopUpAddCard} from "../../n1-main/m2-bll/cardsReducer";
import s from "./Cards.module.scss";
import arrow from "./../../assets/images/icons/arrow-icon.png";


export const Cards = () => {

    // HOOKS
    const cards = useSelector<RootReducerType, OneCardType[]>(state => state.cards.cards)
    const openPopUp = useSelector<RootReducerType, boolean>(state => state.cards.wantAddCard)
    const dispatch = useDispatch()
    const loading = useSelector<RootReducerType, boolean>(state => state.cards.loading)
    // HANDLERS
    const handleAddNewCard = () => {
        dispatch(openPopUpAddCard(true))
    }
    const handleClosePopUp = () => {
        dispatch(openPopUpAddCard(false))
    }
    const handleDeleteCard = (cardId: string, packId: string) => {
        dispatch(deleteCardThunk(cardId, packId))
    }

    return (

        <div className={s.cards}>
            <div className={s.wrap}>
                <div className={s.top}>
                    <button className={s.titleBtn}>
                        <img className={s.arrowIcon} src={arrow} alt="arrow-icon"/>
                    </button>
                    <h2 className={s.title}>Pack Name</h2>
                </div>
                <div className={s.btnBox}>
                    <div className={s.inputWrap}>
                        <SuperInputText className={s.cardsInput} placeholder={"Search..."}/>
                    </div>
                    <SuperButton className={s.cardsBtn} onClick={handleAddNewCard}>Add new card</SuperButton>
                    {loading && <div>Loading...</div>}
                    {
                        openPopUp && <PopUp setServerErrorCallback={handleClosePopUp}
                                            textForPlaceholder={"Question"}
                                            popUpTitle={'Card info'}
                                            textForAnswerPlaceholder={'Answer'}
                                            textForQuestionPlaceholder={'Question'}
                        />
                    }
                </div>
                <div className={s.alertText}>This pack is empty. Click add new card to fill this pack</div>
                <div className={s.table}>
                    <div className={s.tableHeader}>
                        <div className={s.tableItem}>Question</div>
                        <div className={s.tableItem}>Answer</div>
                        <div className={s.tableItem}>Last Updated</div>
                        <div className={s.tableItem}>Grade</div>

                    </div>
                    {
                        cards.map((card) => {
                            return (
                                <div className={s.cardsRow}>
                                    <div className={s.cardsRowItem}>
                                        {card.question}
                                    </div>
                                    <div className={s.cardsRowItem}>
                                        {card.answer}
                                    </div>
                                    <div className={s.cardsRowItem}>
                                        {card.updated}
                                    </div>
                                    <div className={s.cardsRowItem}>
                                        {card.grade}
                                    </div>
                                    <div className={s.cardsRowItem}>
                                        <button onClick={() => handleDeleteCard(card._id, card.cardsPack_id)}>delete
                                        </button>
                                    </div>
                                    <div className={s.cardsRowItem}>
                                        <button>edit</button>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

