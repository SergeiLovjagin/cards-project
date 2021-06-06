import React from 'react';
import {SuperInputText} from "../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useSelector} from "react-redux";
import {RootReducerType} from "../../n1-main/m2-bll/store";
import {OneCardType} from "../../n1-main/m3-dal/api";


type CardsPropsType = {
    packId?: string
}


export const Cards = (props: CardsPropsType) => {

    const cards = useSelector<RootReducerType, OneCardType[]>(state => state.cards.cards)

    return (
        <div>
            <h1>Pack Name</h1>
            <div>
                <SuperInputText placeholder={"search"} />
                <SuperButton>Add new card</SuperButton>
            </div>
            <div>
                {
                    cards.map( (card) => {
                        return (
                            <div>
                                <div>
                                    {card.question}
                                </div>
                                <div>
                                    {card.answer}
                                </div>
                                <div>
                                    {card.updated}
                                </div>
                                <div>
                                    {card.grade}
                                </div>
                                <div>
                                    <button>delete</button>
                                </div>
                                <div>
                                    <button>edit</button>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}