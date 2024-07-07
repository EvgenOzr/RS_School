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
        if((prevProps.search !== this.props.search) && (this.props.search !== '')) {
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

        const { view, loading, error } = this.state;

        if(loading) return <div>Loading...</div>
        if(error) return <div>Nothing found</div>

        let title = '',
             property = '',
             i = 0;

        for (let key in view[0]) {
            if (i === 0){
                title = key;
            } else if(i === 1){
                property = key;
            }
            i++;
        }

        return(
            <div className="view">
                <h2>Results</h2>
                {view.map((elem, idx) => {
                    console.log(elem[title], elem[property]);
                    return <div key={idx}>{elem[title]} , {property} - {elem[property]}</div>
                })}
            </div>
        )
    }
}

View.propTypes = {
    search: PropTypes.string
}

export default View;