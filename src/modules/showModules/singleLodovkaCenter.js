import React from 'react';
import { connect } from 'react-redux';
import { setMainViewApp } from '../../redux/actions';


function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
    };
}

class SingleLodovkaCenterDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyId: props.companyId,
            firstRecommend: props.firstRecommend,
            secondRecommend: props.secondRecommend,
            thirdRecommend: props.thirdRecommend,
            firstColor: props.firstColor,
            secondColor: props.secondColor,
            thirdColor: props.thirdColor,
            lowerPrice: props.lowerPrice,
            maxPrice: props.maxPrice,
        }
    }

    render() {
        return (
            <div className="iceCompanyButton">
                <div className="topICB">Tutaj logo</div>
                <div className="bottomICB">
                    <div className="leftBottomICB">
                        <ul>
                            <li>{this.state.firstRecommend}</li><div className="smallDott" style={{background: this.state.firstColor,boxShadow: '0px 0px 1.5px '+this.state.firstColor+''}} ></div>
                            <li>{this.state.secondRecommend}</li><div className="smallDott" style={{background: this.state.secondColor,boxShadow: '0px 0px 1.5px '+this.state.secondColor+''}}></div>
                            <li>{this.state.thirdRecommend  }</li><div className="smallDott" style={{background: this.state.thirdColor,boxShadow: '0px 0px 1.5px '+this.state.thirdColor+''}}></div>
                        </ul>
                    </div>
                    <div className="rightBottomICB">
                        {this.state.lowerPrice}-{this.state.maxPrice}<br />PLN
                    </div>
                </div>
            </div>
        )
    }

}
const SingleLodovkaCenter = connect(
    null,
    mapDispatchToProps
)(SingleLodovkaCenterDis);
export default SingleLodovkaCenter;