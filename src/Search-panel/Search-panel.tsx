import React, {useState, useEffect} from "react";
import './Search-panel.css'

type MyProps = {
    onUpdateSearch: (arg0: string) => void
}

const Search = ({onUpdateSearch} : MyProps)  => {

    const [search, setSearch] = useState('')
    const [hasError, setHasError] = useState(false)

    
    // componentDidMount(): void {
    //     const search = localStorage.getItem('search');
    //     if(search) {
    //         this.setState({search});
    //     }
    // }

    // componentDidUpdate() {
    //     if (this.state.hasError) foo.bar === 1;
    // }
    useEffect(() => {
        const searchLocal  = localStorage.getItem('search');
        if(typeof searchLocal === 'string'){
            setSearch(searchLocal);
        }
    }, [])


    useEffect (() => {
        if (hasError) foo.bar === 1;
    }, [hasError])

    const onChangeSearch = (e: {target: HTMLInputElement}) => {
        const searchRes: string = e.target.value;
        search.trim()
        setSearch(searchRes)
    }

    const onClickSearch = () => {
        onUpdateSearch(search);
        localStorage.setItem('search', search)
    }

    const onError = () =>{
       setHasError(true)
    }

    return(
        <div className="search">
            <input className="search-input" onChange = {onChangeSearch} value={search}></input>
            <button className="search-btn" onClick = {onClickSearch}>Search</button>
            <button className="error-btn" onClick = {onError}>Throw Error</button>
        </div>
    )
}

export default Search;