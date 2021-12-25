import React from 'react';
import { connect } from 'react-redux';
import { setMainViewApp } from '../../redux/actions';
import { setSubViewApp } from '../../redux/actions';
import { setIceCream } from '../../redux/actions';
import { setIceCompany } from '../../redux/actions';
import firebase from '@firebase/app-compat';


function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
        setSubViewApp: subViewAppState => dispatch(setSubViewApp(subViewAppState)),
        setIceCream: iceCream => dispatch(setIceCream(iceCream)),
        setIceCompany: iceCompany => dispatch(setIceCompany(iceCompany)),
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
            pierwszyLod: '',
            drugiLod: '',
            trzeciLod: '',
            id: props.id,
            key: props.key
        }
    }

    componentDidMount(){
        this.ladujLody()
    }

    async ladujLody() {
        const snapshot1 = await firebase.firestore().collection('icecreams').doc(this.state.firstRecommend).get();
        const snapshot2 = await firebase.firestore().collection('icecreams').doc(this.state.secondRecommend).get();
        const snapshot3 = await firebase.firestore().collection('icecreams').doc(this.state.thirdRecommend).get();
        this.setState({
            pierwszyLod : snapshot1.data().name,
            drugiLod : snapshot2.data().name,
            trzeciLod : snapshot3.data().name

        })
    }
    PokazLoda(key){
        this.props.setIceCream(key);
        this.props.setIceCompany(this.state.id);
        this.props.setSubViewApp(2);
    }
    render() {
        return (
            <div className="iceCompanyButton">
                <div className="topICB">Tutaj logo</div>
                <div className="bottomICB">
                    <div className="leftBottomICB">
                        <ul>
                            <li onClick={()=>this.PokazLoda(this.state.firstRecommend)}>{this.state.pierwszyLod}</li><div className="smallDott" style={{ background: '#' + this.state.firstColor, boxShadow: '0px 0px 1.5px ' + this.state.firstColor + '' }} ></div>
                            <li onClick={()=>this.PokazLoda(this.state.secondRecommend)}>{this.state.drugiLod}</li><div className="smallDott" style={{ background: '#' + this.state.secondColor, boxShadow: '0px 0px 1.5px ' + this.state.secondColor + '' }}></div>
                            <li onClick={()=>this.PokazLoda(this.state.thirdRecommend)}>{this.state.trzeciLod}</li><div className="smallDott" style={{ background: '#' + this.state.thirdColor, boxShadow: '0px 0px 1.5px ' + this.state.thirdColor + '' }}></div>
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