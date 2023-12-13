import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Views.scss';
import { disconnectVMS, loginVMSServer, getAllViews } from '../../helper/vms';
import ModalConnectVMSServer from './Modal/ModalConnectVMSServer';
import { emitter } from '../../utils/emitter';
import { toast } from 'react-toastify';
import { createListCameraFromServer } from '../../services/cameraService';
import { LANGUAGES } from '../../utils/constant';
let getViewsPromise = () => {
    return new Promise((resolve, reject) => {
        getAllViews(
            (items) => {
                resolve(items[0].Items[0].Items[0].Items);
            },
            () => {
                reject('Error getAllViews');
            },
        );
    });
};

class Views extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalConnectVMSServer: false,
            arrCameras: [],
            dataServer: [],
            userInfo: [],
        };
    }

    componentDidMount() {}
    componentWillUnmount() {
        disconnectVMS();
    }
    // Thêm hàm mới để trả về một Promise từ getAllViews

    getAllCameras = async () => {
        try {
            let arrCameras = await getViewsPromise();
            this.setState({ arrCameras });
        } catch (error) {
            console.log(error);
        }
    };
    createCameraAndServer = async (data) => {
        try {
            let response = await createListCameraFromServer(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                toast.success('Create camera and server successfully');
                // truyen data
                // emitter.emit("EVENT_CLEAR_MODAL_DATA", {id : 'abc'});
            }
        } catch (e) {
            console.log(e);
        }
    };
    handleConnectVMSServer = async () => {
        this.setState({
            isOpenModalConnectVMSServer: true,
        });
    };
    toggleUserModal = () => {
        this.setState({
            isOpenModalConnectVMSServer: !this.state.isOpenModalConnectVMSServer,
        });
    };
    connectVMSServer = async (dataServer) => {
        try {
            // console.log('check data register: ', data);  '117.0.39.150:38081', 'test', 'Ars@1234',

            // loginVMSServer(
            //     dataServer.url,
            //     dataServer.username,
            //     dataServer.password,
            //     async () => {
            //         emitter.emit('EVENT_CLEAR_MODAL_DATA_CONNECT_VMS');
            //         this.setState({
            //             isOpenModalConnectVMSServer: false,
            //         });
            //         console.log('Connect VMS successfully');
            //         toast.success('Connect VMS successfully');
            //         this.setState({ dataServer, userInfo: this.props.userInfo });
            //         await this.getAllCameras();
            //         console.log('Check arrCameras2: ', this.state);
            //         // createCameraAndServer(this.state);
            //     },
            //     () => {
            //         console.log('Connect VMS failed');
            //         alert('Connect VMS failed');
            //     },
            // );

            loginVMSServer(
                '117.0.39.150:38081',
                'test',
                'Ars@1234',
                async () => {
                    emitter.emit('EVENT_CLEAR_MODAL_DATA_CONNECT_VMS');
                    this.setState({
                        isOpenModalConnectVMSServer: false,
                    });
                    console.log('Connect VMS successfully');
                    toast.success('Connect VMS successfully');
                    this.setState({ dataServer, userInfo: this.props.userInfo });
                    await this.getAllCameras();
                    console.log('Check arrCameras2: ', this.state);
                    await this.createCameraAndServer(this.state);
                },
                () => {
                    console.log('Connect VMS failed');
                    alert('Connect VMS failed');
                },
            );
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        // const { userInfo } = this.props;
        return (
            <div className="views-container">
                <ModalConnectVMSServer
                    isOpen={this.state.isOpenModalConnectVMSServer}
                    toggleFromParent={this.toggleUserModal}
                    connectVMSServerFromParent={this.connectVMSServer}
                />
                <div className="title">VIEWS</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3 connectVMS" onClick={() => this.handleConnectVMSServer()}>
                        <i className="fas fa-plus px-2"></i>
                        Connect VMS Server
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Views);
