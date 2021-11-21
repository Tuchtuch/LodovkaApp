import React from 'react';
import { connect } from 'react-redux';
import { setMainViewApp } from '../redux/actions';
import '../styles/ButtonSearchbar.css';


function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
    };
}

class SearchBarDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <div className="searchBar">
                <div className="topHeader">Zajrzyj do naszej Lodóvki i sprawdź najnowsze smaki...</div>  
                <div className="searchInput"><input className="SearchbarText" type="text" placeholder="Wyszukaj..."/><button className="Searchbar">Szukaj...</button></div>            
            </div>
        )
    }

}
const SearchBar = connect(
    null,
    mapDispatchToProps
)(SearchBarDis);
export default SearchBar;