import React from 'react';
import LoadSpinner from './images/spinner.gif';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { isLoading: state.isLoading.isLoading };
};

function LoaderFunc({ isLoading }) {

    if (isLoading) {
        return (
            <div className="loading_overflow">
                {<img className="spinnerImg" src={LoadSpinner} alt="LoadSpinner" />}
            </div>
        )

    } else return (<div className="loadedContent"></div>)
}

const Loader = connect(mapStateToProps)(LoaderFunc);

export default Loader;