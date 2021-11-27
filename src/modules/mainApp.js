import React from 'react';
import { connect } from 'react-redux';
import { setMainViewApp } from '../redux/actions';
import SingleLodovkaCenter from './showModules/singleLodovkaCenter';



function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
    };
}

class MainAppDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="mainApp">
                <SingleLodovkaCenter
                    firstRecommend="pierwsza Rekomendacja"
                    secondRecommend="druga rekomendacja"
                    thirdRecommend="trzecia rekomendacja"
                    firstColor="#f00"
                    secondColor="#0f0"
                    thirdColor="#00f"
                    lowerPrice="3"
                    maxPrice="7" />
                <SingleLodovkaCenter
                    firstRecommend="pierwsza rekom"
                    secondRecommend="druga rekom"
                    thirdRecommend="trzecia rekom"
                    firstColor="#f4a"
                    secondColor="#a54"
                    thirdColor="#4ff"
                    lowerPrice="5"
                    maxPrice="9" />
                <SingleLodovkaCenter
                    firstRecommend="pierwsza rekom"
                    secondRecommend="druga rekom"
                    thirdRecommend="trzecia rekom"
                    firstColor="#f4a"
                    secondColor="#a54"
                    thirdColor="#4ff"
                    lowerPrice="5"
                    maxPrice="9" />
                <SingleLodovkaCenter
                    firstRecommend="pierwsza rekom"
                    secondRecommend="druga rekom"
                    thirdRecommend="trzecia rekom"
                    firstColor="#f4a"
                    secondColor="#a54"
                    thirdColor="#4ff"
                    lowerPrice="5"
                    maxPrice="9" />
            </div>
        )
    }

}
const MainApp = connect(
    null,
    mapDispatchToProps
)(MainAppDis);
export default MainApp;