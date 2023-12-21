import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Views.scss';
import { disconnectVMS, loginVMSServer, getAllViews, videoConnectionReceivedFrame } from '../../helper/vms';
import ModalConnectVMSServer from './Modal/ModalConnectVMSServer';
import { emitter } from '../../utils/emitter';
import { toast } from 'react-toastify';
import { createListCameraFromServer } from '../../services/cameraService';
import { LANGUAGES } from '../../utils/constant';
// import { createRoot } from 'react-dom/client';

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
            arrAddedCameras: [],
            dataServer: [],
            isConnect: false,
        };
    }

    componentDidMount() {}

    componentWillUnmount() {
        if (this.state.isConnect) {
            disconnectVMS();
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.isOpenModalConnectVMSServer === true && this.state.isOpenModalConnectVMSServer === false) {
            // Xoá toàn bộ dữu liệu vừa nhập của modal connect
            emitter.emit('EVENT_CLEAR_MODAL_DATA_CONNECT_VMS');
        }
    }
    // Thêm hàm mới để trả về một Promise từ getAllViews
    getAllCameras = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let arrCameras = await getViewsPromise();
                resolve(arrCameras);
            } catch (error) {
                console.log(error);
                reject();
            }
        });
    };
    createCameraAndServer = async (data) => {
        try {
            let response = await createListCameraFromServer(data);
            console.log('response = ', response);
            if (response) {
                if (response.errMessage1 !== '') toast.success(response.errMessage1);
                else if (response.errMessage2 !== '') toast.error(response.errMessage2);
            } else {
                toast.success('Dont have response from backend');
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
        return new Promise(async (resolve, reject) => {
            try {
                //     dataServer.server,
                //     dataServer.username,
                //     dataServer.password,
                loginVMSServer(
                    '117.0.39.150:38081',
                    'test',
                    'Ars@1234',
                    async () => {
                        // Thông báo cho người dùng
                        console.log('Connect VMS successfully');
                        toast.success('Connect VMS successfully');
                        // Lấy list camera từ VMS server
                        let arrCameras = await this.getAllCameras();
                        this.setState(
                            {
                                arrCameras,
                                dataServer,
                                isConnect: true,
                            },
                            () => {
                                resolve(this.state);
                            },
                        );
                    },
                    () => {
                        console.log('Connect VMS failed');
                        reject('Connect VMS failed');
                        alert('Connect VMS failed');
                    },
                );
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    };
    saveDataIntoDB = async (selectedCheckboxes) => {
        try {
            console.log('check data in selectedCheckboxes after send: ', selectedCheckboxes);
            // Xoá toàn bộ dữu liệu vừa nhập của modal connect
            // emitter.emit('EVENT_CLEAR_MODAL_DATA_CONNECT_VMS');
            // Lưu dữ liệu với database
            let userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo'));
            // let filteredCameras = arrCameras.filter((item) => selectedCheckboxes.has(item.Id));
            await this.setState({
                arrAddedCameras: this.state.arrCameras.filter((item) => selectedCheckboxes.has(item.Id)),
            });
            let data = {
                userInfoFromStorage,
                arrAddedCameras: this.state.arrAddedCameras,
                dataServer: {
                    server: this.state.dataServer.server,
                    username: this.state.dataServer.username,
                    password: this.state.dataServer.password,
                },
            };
            // Tạo bản ghi camera và server vào database
            console.log('Check state in saveDataIntoDB: ', data);
            await this.createCameraAndServer(data);
        } catch (e) {
            console.log(e);
        }
    };

    getImage = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let image = await videoConnectionReceivedFrame();

                console.log('image ', image);
                resolve('OK');
            } catch (error) {
                console.log(error);
                reject();
            }
        });
    };

    render() {
        // console.log('Check state in views page: ', this.state);
        return (
            <div className="views-container">
                <ModalConnectVMSServer
                    isOpen={this.state.isOpenModalConnectVMSServer}
                    toggleFromParent={this.toggleUserModal}
                    connectVMSServerFromParent={this.connectVMSServer}
                    saveDataIntoDBFromParent={this.saveDataIntoDB}
                />
                <div className="title">VIEWS</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3 connectVMS" onClick={() => this.handleConnectVMSServer()}>
                        <i className="fas fa-plus px-2"></i>
                        Connect VMS Server
                    </button>
                    <button className="btn btn-primary px-3 connectVMS" onClick={() => this.getImage()}>
                        <i className="fas fa-plus px-2"></i>
                        Get image
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Views);
