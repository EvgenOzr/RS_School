import React, {Component} from "react";
import './Search-panel.css'

type MyProps = {
    onUpdateSearch: (arg0: string) => void
}

class Search extends Component <MyProps> {

    state = {
        search: '',
        hasError: false
    }
    
    componentDidMount(): void {
        const search = localStorage.getItem('search');
        if(search) {
            this.setState({search});
        }
    }

    componentDidUpdate() {
        if (this.state.hasError) foo.bar === 1;
    }

    onChangeSearch = (e: {target: HTMLInputElement}) => {
        console.log(typeof(e));
        
        const search: string = e.target.value;
        search.trim()
        this.setState({search});
    }

    onClickSearch = () => {
        this.props.onUpdateSearch(this.state.search);
        localStorage.setItem('search', this.state.search)
    }

    onError = () =>{
        this.setState({hasError: true})
    }

    render(): React.ReactNode {
        const localSearch = this.state.search;
        return(
            <div className="search">
                <input className="search-input" onChange = {this.onChangeSearch} value={localSearch}></input>
                <button className="search-btn" onClick = {this.onClickSearch}>Search</button>
                <button className="error-btn" onClick = {this.onError}>Throw Error</button>
            </div>
        )
    }
}

export default Search;