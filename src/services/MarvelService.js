import { useHttp } from "../hooks/http.hook"
import md5 from 'md5';

const useMarvelService = () => {
    const {loading, error, clearError, request} = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'ff0cf550961c65b20703f74c3a3d4722';
    const _privateKey = '5f628cb15e0de0625f162da7d929f5ee';
    const _baseOffset = 210;

    const _getAuthParams = () => {
        const ts = Date.now().toString();
        return `ts=${1}&apikey=${_apiKey}&hash=${_privateKey}`;
    };

    const getAllCharacters = async (offset = _baseOffset) => {
        const authParams = _getAuthParams();
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${authParams}`);
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const authParams = _getAuthParams();
        const res = await request(`${_apiBase}characters/${id}?${authParams}`);
        return _transformCharacter(res.data.results[0]);
    };

    const getAllComics = async (offset = _baseOffset) => {
        const authParams = _getAuthParams();
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${authParams}`);
        return res.data.results.map(_transformComics);
    };

    const _transformComics = (char) => {
        return {
            id: char.id,
            title: char.title,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
        }
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            desription: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items.slice(0, 10)
        }
    }

    return {loading, clearError, error, getAllCharacters, getCharacter, getAllComics}
}

export default useMarvelService

