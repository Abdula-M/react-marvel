import { useState, useEffect} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharItem = (props) => {
     
    const {id, name, thumbnail, onCharSelected} = props
    let imgStyle = {'objectFit' : 'cover'};
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'};
        }
    return (
        <div>
            <li onClick={(e) => {onCharSelected(id)}} className={'char__item'}>
                <img src={thumbnail} style={imgStyle} alt="abyss"/>
                <div className="char__name">{name}</div>
            </li>
        </div>
    )
    }

const CharList = ({onCharSelected}) => {

    const [charList, setCharList] = useState([])
    const [newItemsLoading, setNewItemsLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)
    
    const {loading, error, getAllCharacters} =  useMarvelService()

    useEffect(() => {
        onRequest(offset, true) // eslint-disable-next-line 
    }, [])
    
    
    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
        getAllCharacters(offset).then(onCharListLoaded)
    }


    const onCharListLoaded = (newCharList) => {
        let ended = false
        if (newCharList.length < 9) {
            ended = true
        }
        setCharList(charList => [...charList, ...newCharList])
        setNewItemsLoading(newItemsLoading => false)
        setOffset(({offset}) => offset + 9)
        setCharEnded(charEnded => ended)
    }

    const renderItems = () => {
        return (
            <ul className="char__grid">
                {charList.map((item, i) => (<CharItem id={item.id} name={item.name} thumbnail={item.thumbnail}  onCharSelected={onCharSelected}  key={item.id}/>))}
            </ul>
        )
    }
    
        const items = renderItems();
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading && !newItemsLoading ? <Spinner/> : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {items} 
                <button
                    disabled={newItemsLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}
                    className="button button__main button__long">
                    <div className="inner">{newItemsLoading ? 'Loading...' : 'load more'}</div>
                </button>
            </div>
        )
    }

export default CharList;