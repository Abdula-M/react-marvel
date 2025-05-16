import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage.js';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from "../../services/MarvelService";
import { useEffect, useState } from "react";

import './randomChar.scss';

const RandomChar = () => {
    const [char, setChar] = useState(null)
    const {loading, error, clearError, getCharacter} = useMarvelService()

    useEffect(() => {
        updateChar()
        const timerId = setInterval(updateChar, 60000)
        return () => {
            clearInterval(timerId)
        } // eslint-disable-next-line 
    }, [])

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getCharacter(id).then(onCharLoaded)
    }

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
}

const View = ({char}) => {
    const {name, desription, thumbnail, homepage, wiki} = char || {}
    let notImg = "randomchar__img "
    thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? notImg += "notImg"  : notImg = "randomchar__img"
    
    return (
        <div className="randomchar__block">
        <img
        src={thumbnail} alt="Random character" className={notImg}/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {desription ? desription?.length > 200 ? `${desription.slice(0, 200)}...` : desription : 'No description'}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}


export default RandomChar;