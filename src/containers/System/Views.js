import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import './Views.scss';
import { Helmet } from 'react-helmet';
// import * as XPMobileSDK from '../lib/XPMobileSDK.js';
// import { XPMobileSDK, XPMobileSDKSettings } from '../../../public/lib/XPMobileSDK';
class Views extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastObserver: {},
        };
    }
    // initializeXPMobileSDK() {
    //     // Import tệp XPMobileSDK.js
    //     import('%PUBLIC_URL%/lib/XPMobileSDK.js').then((XPMobileSDK) => {
    //         // Gọi các hàm hoặc API từ thư viện
    //         XPMobileSDK.someFunction();
    //     });
    // }
    componentDidMount() {
        // this.initializeXPMobileSDK();
        // this.connectToServer('http://117.0.39.150:38081/');
        // XPMobileSDK.connect('http://117.0.39.150:38081/');
    }
    // connectionDidConnect = () => {
    //     let username = 'test';
    //     let password = 'Ars@1234';
    //     let loginType = 'Basic'; // ActiveDirectory
    //     this.login(username, password, loginType);
    //     console.log('connectionDidConnect');
    // };
    // connectToServer = (serverName) => {
    //     let url = serverName || window.location.origin;

    //     if (!/^http/.test(url)) {
    //         url = 'http://' + url;
    //     }

        // XPMobileSDKSettings.MobileServerURL = url;

    //     if (this.lastObserver) {
    //         XPMobileSDK.removeObserver(this.lastObserver);
    //     }

    //     this.lastObserver = {
    //         connectionDidConnect: this.connectionDidConnect,
    //         connectionDidLogIn: () => {
    //             console.log('connectionDidLogIn');
    //         },
    //         connectionFailedToLogIn: () => {
    //             console.log('connectionFailedToLogIn');
    //         },
    //     };

    //     XPMobileSDK.addObserver(this.lastObserver);

    //     XPMobileSDK.connect(url);
    // };

    // login = (username, password, loginType) => {
    //     XPMobileSDK.login(username, password, loginType, {
    //         SupportsAudioIn: 'Yes',
    //         SupportsAudioOut: 'Yes',
    //     });
    // };
    // getAllCameras = () => {
    //     XPMobileSDK.getAllViews(function (items) {
    //         for (var i = 0; i < items[0].Items[0].Items[0].Items.length; i++) {
    //             console.log(
    //                 'Camera:',
    //                 JSON.stringify(items[0].Items[0].Items[0].Items[i])
    //             );
    //         }
    //     });
    // };
    
    render() {
        // console.log("check state user ", this.state);
        // console.log("id ", this.state.arrUsers);
        
        return (
            <>
                <div className="title">VIEWS</div>
                <button className='btn-getcamera' onClick={() => this.getAllCameras()}>OK</button>
               
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Views);

