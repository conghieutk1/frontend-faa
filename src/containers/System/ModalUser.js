import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import React, { Component } from "react";
//import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            phonenumber: "",
            roleId: "R1",
            gender: "M",
            positionId: "P0",
        };
        this.listenToEmitter();
    }

    componentDidMount() {}

    toggle = () => {
        this.props.toggleFromParent();
    };

    listenToEmitter() {
        emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                address: "",
                phonenumber: "",
                roleId: "R1",
                gender: "M",
                positionId: "P0",
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
        let arrInput = [
            "email",
            "password",
            "firstName",
            "lastName",
            "address",
            "phonenumber",
            "roleId",
            "gender",
            "positionId",
        ];
        console.log("check data arrInput: ", this.state);
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing parameter: " + arrInput[i]);
                break;
            }
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
                className={"modal-user-container"}
                size="lg"
                centered
            >
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    Create a new user
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "email");
                                }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "password");
                                }}
                                value={this.state.password}
                            />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>First name</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(
                                        event,
                                        "firstName"
                                    );
                                }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <label>Last name</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "lastName");
                                }}
                                value={this.state.lastName}
                            />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Address</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "address");
                                }}
                                value={this.state.address}
                            />
                        </div>
                        <div className="input-container">
                            <label>Phone number</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(
                                        event,
                                        "phonenumber"
                                    );
                                }}
                                value={this.state.phonenumber}
                            />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Role</label>
                            <select
                                className="role"
                                value={this.state.roleId}
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "roleId");
                                }}
                            >
                                <option value="R1">Admin</option>
                                <option value="R2">Doctor</option>
                                <option value="R3">Patient</option>
                            </select>
                            {/* <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "roleId");
                                }}
                                value={this.state.roleId}
                            /> */}
                        </div>
                        <div className="input-container">
                            <label>Gender</label>
                            <select
                                className="gender"
                                value={this.state.gender}
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "gender");
                                }}
                            >
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
                            </select>
                            {/* <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "gender");
                                }}
                                value={this.state.gender}
                            /> */}
                        </div>
                        <div className="input-container">
                            <label>Position</label>
                            <select
                                className="position"
                                value={this.state.positionId}
                                onChange={(event) => {
                                    this.handleOnChangeInput(
                                        event,
                                        "positionId"
                                    );
                                }}
                            >
                                <option value="P0">None</option>
                                <option value="P1">Master</option>
                                <option value="P2">Doctor</option>
                                <option value="P3">Associate Professor</option>
                                <option value="P4">Professor</option>
                            </select>
                            {/* <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(
                                        event,
                                        "positionId"
                                    );
                                }}
                                value={this.state.positionId}
                            /> */}
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
                    </Button>{" "}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
