import React, {Component} from "react";
import PropTypes from 'prop-types';
import SwapiService from "../Services/swapi-service";
import './View.css';

interface IProps {
    search: string,
}

class View extends Component <IProps> {

    state = {
        view: [],
        loading: false,
        error: false
    }

    swapiService = new SwapiService();

    static propTypes: { search: PropTypes.Requireable<string>; };

    componentDidUpdate(prevProps:IProps): void {
        if(prevProps.search !== this.props.search) {
            this.setState({...this.state, loading: true})
            this.getSearchResults(this.props.search)
                .then(this.onSearchLoaded)
                .catch(this.onError)
        }
    }

    onSearchLoaded = (answer: []) => {
        this.setState({
            view: answer,
            loading: false,
            error: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    getSearchResults = async (item: string) => {
        const res = await this.swapiService.getSearch(item)
        return res.results;
    }

    render(): React.ReactNode {
        console.log(this.state.view);

        const { view, loading, error } = this.state;

        if(loading) return <div>Loading...</div>
        if(error) return <div>Nothing found</div>
        return(
            <div className="view">
                <h2>Results</h2>
                {view.map(({name}, idx) => {
                    return <div key={idx}>{name}</div>
                })}
            </div>
        )
    }
}

View.propTypes = {
    search: PropTypes.string
}

export default View;