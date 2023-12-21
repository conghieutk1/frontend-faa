import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import React, { Component } from 'react';
//import { FormattedMessage } from "react-intl";
import { connect } from 'react-redux';
import { emitter } from '../../../utils/emitter';
import './ModalConnectVMSServer.scss';
class ModalConnectVMSServer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            server: '',
            username: '',
            password: '',
            currentPage: 0,
            itemsPerPage: 5, // Số mục muốn hiển thị trên mỗi trang
            pageCount: 0,
            displayedItems: [],
            selectedCheckboxes: new Set(),
            isConnect: false,
        };
        this.listenToEmitter();
    }

    componentDidMount() {}
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.selectedCheckboxes !== prevState.selectedCheckboxes) {
            console.log('Updated selectedCheckboxes:', this.state.selectedCheckboxes);
        }
    }
    componentWillUnmount() {
        // this.setState({});
    }
    toggle = () => {
        this.props.toggleFromParent();
    };

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA_CONNECT_VMS', () => {
            this.setState({
                server: '',
                password: '',
                username: '',
                arrCameras: [],
                isConnect: false,
                currentPage: 0,
                pageCount: 0,
                displayedItems: [],
            });
        });
    }

    handleOnChangeInput = (event, id) => {
        //console.log(event.target.value, "id: ", id);

        //bad code
        // this.state[id] =event.target.value;
        // this.setState({
        //     ...this.state
        // }, () => {
        //     console.log("check bad code:", this.state);
        // })

        //good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };
    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['server', 'username', 'password'];
        // console.log('check data arrInput: ', this.state);
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    };
    handleConnectVMSServer = async () => {
        let isValid = this.checkValidInput();
        if (isValid) {
            let dataFromViews = await this.props.connectVMSServerFromParent(this.state);
            console.log('check dataFromViews: ', dataFromViews);
            this.setState({
                isConnect: dataFromViews.isConnect,
                arrCameras: dataFromViews.arrCameras,
                pageCount: Math.ceil(dataFromViews.arrCameras.length / this.state.itemsPerPage),
                displayedItems: dataFromViews.arrCameras.slice(
                    this.state.currentPage * this.state.itemsPerPage,
                    (this.state.currentPage + 1) * this.state.itemsPerPage,
                ),
            });
            console.log('state in modal in func handleConnectVMSServer : ', this.state);
        }
    };
    handleSaveData = () => {
        if (this.state.selectedCheckboxes.size === 0) {
            alert('Please select at least one item');
        } else {
            console.log('check state selectedCheckboxes before send: ', this.state);
            this.props.saveDataIntoDBFromParent(this.state.selectedCheckboxes);
        }
    };
    handlePageClick = (data) => {
        this.setState({
            currentPage: data.selected,
            displayedItems: this.state.arrCameras.slice(
                data.selected * this.state.itemsPerPage,
                (data.selected + 1) * this.state.itemsPerPage,
            ),
        });
    };
    handleCheckboxChange = (itemId) => {
        let { selectedCheckboxes } = this.state;

        // Tạo một bản sao của Set để tránh thay đổi trực tiếp trên state
        const newSelectedCheckboxes = new Set(selectedCheckboxes);

        if (newSelectedCheckboxes.has(itemId)) {
            newSelectedCheckboxes.delete(itemId);
        } else {
            newSelectedCheckboxes.add(itemId);
        }

        this.setState({ selectedCheckboxes: newSelectedCheckboxes });
    };
    render() {
        // console.log('check data ModalConnectVMSServer: ', this.state);
        let { arrCameras } = this.state;
        let { pageCount, displayedItems, selectedCheckboxes } = this.state;
        // const pageCount = Math.ceil(arrCameras.length / itemsPerPage);
        // const displayedItems = arrCameras.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.toggle();
                }}
                className={'modal-user-container'}
                size="lg"
                centered
            >
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    Connect to VMS server
                </ModalHeader>
                <ModalBody>
                    <div className="modal-connect-vms-body">
                        <div className="input-container-server">
                            <label>Server</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, 'server');
                                }}
                                value={this.state.server}
                            />
                        </div>
                    </div>
                    <div className="modal-connect-vms-body">
                        <div className="input-container">
                            <label>Username</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, 'username');
                                }}
                                value={this.state.username}
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, 'password');
                                }}
                                value={this.state.password}
                            />
                        </div>
                    </div>

                    <div className="modal-connect-vms-table">
                        <table id="TableManageCameraToAdd">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Authentication ID</th>
                                    <th>Camera name</th>
                                    <th>Select to add</th>
                                </tr>
                                {arrCameras &&
                                    displayedItems.length > 0 &&
                                    displayedItems.map((item, index) => {
                                        return (
                                            <tr key={item.Id}>
                                                <td>{index + 1}</td>
                                                <td>{item.Id}</td>
                                                <td>{item.Name}</td>

                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        id={`checkbox-${item.Id}`}
                                                        checked={selectedCheckboxes.has(item.Id)}
                                                        onChange={() => this.handleCheckboxChange(item.Id)}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-connect-vms-paging">
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            this.handleConnectVMSServer();
                        }}
                        className="px-3"
                        disabled={this.state.isConnect === true ? true : false}
                    >
                        Connect
                    </Button>{' '}
                    <Button
                        color="primary"
                        onClick={() => {
                            this.handleSaveData();
                        }}
                        className="px-3"
                    >
                        Add data
                    </Button>{' '}
                    <Button
                        color="secondary"
                        onClick={() => {
                            this.toggle();
                        }}
                        className="px-3"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalConnectVMSServer);
