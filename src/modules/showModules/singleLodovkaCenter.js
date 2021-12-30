import React from 'react';
import { connect } from 'react-redux';
import { setMainViewApp } from '../../redux/actions';
import { setSubViewApp } from '../../redux/actions';
import { setIceCream } from '../../redux/actions';
import { setIceCompany } from '../../redux/actions';
import firebase from '@firebase/app-compat';
import noImg from '../../images/noImg.png';
import { setLoader } from '../../redux/actions';


function mapDispatchToProps(dispatch) {
    return {
        setMainViewApp: mainViewAppState => dispatch(setMainViewApp(mainViewAppState)),
        setSubViewApp: subViewAppState => dispatch(setSubViewApp(subViewAppState)),
        setIceCream: iceCream => dispatch(setIceCream(iceCream)),
        setIceCompany: iceCompany => dispatch(setIceCompany(iceCompany)),
        setLoader: isLoading => dispatch(setLoader(isLoading))
    };
}

class SingleLodovkaCenterDis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgLink: props.imgLink,
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

    componentDidMount() {
        this.ladujLody()
    }

    async ladujLody() {
        this.props.setLoader(true);
        const snapshot1 = await firebase.firestore().collection('icecreams').doc(this.state.firstRecommend).get();
        const snapshot2 = await firebase.firestore().collection('icecreams').doc(this.state.secondRecommend).get();
        const snapshot3 = await firebase.firestore().collection('icecreams').doc(this.state.thirdRecommend).get();
        this.setState({
            pierwszyLod: snapshot1.data().name,
            drugiLod: snapshot2.data().name,
            trzeciLod: snapshot3.data().name

        })
        this.props.setLoader(false);
    }
    PokazLoda(key) {
        this.props.setIceCream(key);
        this.props.setIceCompany(this.state.id);
        this.props.setSubViewApp(2);
    }
    showImage(imgLink) {
        if (!imgLink) {
            return (<div><img src={noImg} alt="img" onClick={() => this.PokazLoda(this.state.firstRecommend)} /></div>)
        }
        else {
            return (<img src={imgLink} className="singleLodovkaImg" onClick={() => this.PokazLoda(this.state.firstRecommend)} alt="logo" />)
        }
    }
    render() {
        return (
            <div className="iceCompanyButton">
                <div className="topICB">{this.showImage(this.state.imgLink)}</div>
                <div className="bottomICB">
                    <div className="leftBottomICB">
                        <ul>
                            <li onClick={() => this.PokazLoda(this.state.firstRecommend)}>{this.state.pierwszyLod}</li><div className="smallDott" style={{ background: this.state.firstColor, boxShadow: '0px 0px 1.5px ' + this.state.firstColor + '' }} ></div>
                            <li onClick={() => this.PokazLoda(this.state.secondRecommend)}>{this.state.drugiLod}</li><div className="smallDott" style={{ background: this.state.secondColor, boxShadow: '0px 0px 1.5px ' + this.state.secondColor + '' }}></div>
                            <li onClick={() => this.PokazLoda(this.state.thirdRecommend)}>{this.state.trzeciLod}</li><div className="smallDott" style={{ background: this.state.thirdColor, boxShadow: '0px 0px 1.5px ' + this.state.thirdColor + '' }}></div>
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