import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const App = () => {
    
    const [selectedChar, setSelectedChar] = useState(null)
    

    const onCharSelected = (id) => {
        setSelectedChar(id)
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <AppBanner/>
                <RandomChar/> 
                <div className="char__content">
                    <CharList  onCharSelected={onCharSelected}/>
                    <CharInfo charId={selectedChar}/>
                </div>
                    {/* <ComicsList/> */}
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
    }


export default App;






