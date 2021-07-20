import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import style from "./DetailDog.module.css";

export default function DogDetail({match}) {
    const {id} = match.params;
    const aDog = useSelector(state => state.dogDetail)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetail(id));
    },
    // eslint-disable-next-line
    [])

    function renderDog(dog) {
        const url ="https://www.nationalgeographic.com.es/medio/2021/03/09/perro_4da5a8be_800x1200.jpg"

        if (id.length < 10) {
            return (
                <div className={style.contenedor}>

                    <p className={style.text}>{aDog?.name}</p>
                    <img src={aDog?.image?.url} className={style.image} alt="Not found"/>
                    <p className={style.text2}>{aDog?.height?.metric}</p>
                    <p className={style.text2}>{aDog?.weight?.metric}</p>
                    <p className={style.text2}>{aDog?.life_span}</p>
                    <p className={style.text2}>{aDog?.temperament}</p>
                </div>
            )
        } else {
            if (!aDog.id) {
                <h1>Loading...</h1>
            }
            aDog?.forEach((e) =>{
                e.temperament= ""
                for(let i = 0; i<e.temperaments.length; i++){
                    e.temperament += e.temperaments[i].name.toString() + ", "
                }
            })
            return (
                <div className={style.contenedor}>
                    <p className={style.text}>{aDog[0]?.name}</p>
                    <img src={url} className={style.image} alt="Not found"/>
                    <p className={style.text2}>{aDog[0]?.height}</p>
                    <p className={style.text2}>{aDog[0]?.weight}</p>
                    <p className={style.text2}>{aDog[0]?.life_span}</p>
                    <p className={style.text2}>{aDog[0]?.temperament}</p>
                </div>
            )
        }
    }

    
    console.log(aDog)
    return (
        <div>
        {typeof(aDog) === "undefined" 
        ? <h1>Loading...</h1>
        : renderDog(aDog)
        }
        </div>
    )
    
}

module.export = DogDetail;