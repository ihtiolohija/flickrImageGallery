import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state={
            suggestion: '',
            currentSearchValue: ''
        };
    }
    handleSearch = event => {
        event.persist();
        let currentValue = event.target.value;
        if (currentValue) {
            let currentSuggestions = localStorage.getItem('searchList');
            if (currentSuggestions) {
                try {
                    let suggestionsLimit = 20;
                    let cs = JSON.parse(currentSuggestions);
                    if (cs.length > 20){
                        localStorage.removeItem('searchList');
                        cs = [];
                    }
                    cs.push(currentValue);
                    localStorage.setItem('searchList', JSON.stringify(cs));
                }
                catch(e){

                }

            }
            else {
                let currentItems = [];
                currentItems.push(currentValue);
                let items = [];
                try {
                    items = JSON.stringify(currentItems);
                    localStorage.setItem('searchList', items);
                }
                catch (e) {

                }
            }

            this.setState({
                currentSearchValue: currentValue
            }, ()=>{
                this.props.handleSearch(currentValue);
            });
        }
    };

    handleSuggestions = event=>{
        event.persist();
        let searchString = event.target.value;
        this.setState({
            suggestion: searchString,
            currentSearchValue: searchString
        }, ()=>{
           this.props.handleSearch(searchString);
        });
    };


    render() {
        let searchHistoryText = 'Search History';
        let suggestions = localStorage.getItem('searchList') || [];
        if (suggestions) {
            try {
                suggestions = JSON.parse(suggestions);
            }

            catch (e) {

            }
        }
        return (
            <div className="Search-Bar">
                <input
                    type="text"
                    placeholder="Search for images..."
                    onChange={this.handleSearch}
                    value={this.state.currentSearchValue}
                />
                {suggestions.length >0 ?
                <label>
                    <span>{searchHistoryText}</span>
                    <select value={this.state.suggestion} onChange={this.handleSuggestions}>
                        {suggestions.map((el, index) => {
                        return <option key={index} value={el}>{el}</option>
                        })}
                    </select>
                </label>
                    : null}
            </div>
        );
    }
}

export default SearchBar;
