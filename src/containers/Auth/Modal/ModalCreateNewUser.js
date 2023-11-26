import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import React, { Component } from 'react';
//import { FormattedMessage } from "react-intl";
import { connect } from 'react-redux';
import { emitter } from '../../../utils/emitter';

class ModalCreateNewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            confirmPassword: '',
        };
        this.listenToEmitter();
    }

    componentDidMount() {}

    toggle = () => {
        this.props.toggleFromParent();
    };

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                account: '',
                password: '',
                confirmPassword: '',
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
        let arrInput = ['account', 'password', 'confirmPassword'];
        console.log('check data arrInput: ', this.state);
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        if (this.state.password !== this.state.confirmPassword) {
            isValid = false;
            alert('Password not match!');
        }
        return isValid;
    };
    handleAddNewUser = () => {
        let isValid = this.checkValidInput();
        if (isValid) {
            this.props.createNewUserFromParent(this.state);
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
                    Register
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container-account">
                            <label>Account</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, 'account');
                                }}
                                value={this.state.account}
                            />
                        </div>
                    </div>
                    <div className="modal-user-body">
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
                        <div className="input-container">
                            <label>Confirm password</label>
                            <input
                                type="password"
                                onChange={(event) => {
                                    this.handleOnChangeInput(
                                        event,
                                        'confirmPassword'
                                    );
                                }}
                                value={this.state.confirmPassword}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            this.handleAddNewUser();
                        }}
                        className="px-3"
                    >
                        Add new
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateNewUser);
