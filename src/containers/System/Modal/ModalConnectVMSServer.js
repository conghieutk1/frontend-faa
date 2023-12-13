import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import React, { Component } from 'react';
//import { FormattedMessage } from "react-intl";
import { connect } from 'react-redux';
import { emitter } from '../../../utils/emitter';

class ModalConnectVMSServer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            server: '',
            username: '',
            password: '',
        };
        this.listenToEmitter();
    }

    componentDidMount() {}
    componentWillUnmount() {
        this.setState({});
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
    handleConnectVMSServer = () => {
        let isValid = this.checkValidInput();
        if (isValid) {
            this.props.connectVMSServerFromParent(this.state);
            // console.log("check good state:", this.state);
        }
    };

    render() {
        // console.log("check data usermanage: ", this.state);
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
                    <div className="modal-user-body">
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
                    <div className="modal-user-body">
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
                                value={this.state.vmsPassword}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            this.handleConnectVMSServer();
                        }}
                        className="px-3"
                    >
                        Connect
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
