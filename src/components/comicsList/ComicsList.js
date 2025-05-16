import './comicsList.scss';
import React from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';


const Comics = ({id, title, thumbnail}) => {
    return (
        <li onClick={() =>console.log(id)} className="comics__item">
            <a href="#">
                <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">9.99$</div>
            </a>
        </li>
    )
}

const ComicsList = () => {
    const {loading, error, getAllComics} = useMarvelService()
    const [comicsList, setComicsList] = React.useState([])
    const [newItemsLoading, setNewItemsLoading] = React.useState(false)
    const [offset, setOffset] = React.useState(210)
    const [comicsEnded, setComicsEnded] = React.useState(false)

    React.useEffect(() => {
        async function fetchData() {
            onRequest(offset, true)
        }
        fetchData()
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
        getAllComics(offset).then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false
        if (newComicsList.length < 8) {
            ended = true
        }
        setComicsList(comicsList => [...comicsList, ...newComicsList])
        setNewItemsLoading(newItemsLoading => false)
        setOffset(({offset}) => offset + 8)
        setComicsEnded(comicsEnded => ended)
    }

    const renderItems = () => {
        return (
            <ul className="comics__grid">
                {comicsList.map((item, i) => (
                    <Comics key={i} {...item}/>
                ))}
            </ul>
        )
    }

    const items = renderItems()
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading && !newItemsLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                    disabled={newItemsLoading}
                    style={{'display': comicsEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}
                    className="button button__main button__long">
                    <div className="inner">{newItemsLoading ? 'Loading...' : 'load more'}</div>
                </button>
        </div>
    )
}

export default ComicsList;