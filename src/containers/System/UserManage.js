import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
    getAllUsers,
    createNewUserByReact,
    deleteUserByReact,
    editUserByReact,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        };
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await getAllUsers("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    };

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        });
    };

    createNewUser = async (data) => {
        try {
            console.log("check data usermanage: ", data);
            let response = await createNewUserByReact(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false,
                });
                toast.success("Create user success");
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
                // truyen data
                // emitter.emit("EVENT_CLEAR_MODAL_DATA", {id : 'abc'});
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleDeleteUser = async (user) => {
        console.log("delete ", user);
        try {
            let response = await deleteUserByReact(user.id);
            if (response && response.errCode === 0) {
                await this.getAllUserFromReact();
                toast.success("Delete user success");
            } else {
                alert(response.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleEditUser = (user) => {
        console.log("edit ", user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        });
    };

    doEditUser = async (user) => {
        try {
            let response = await editUserByReact(user);
            // console.log("response ", response);
            if (response && response.errCode === 0) {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalEditUser: false,
                });
                toast.success("Edit user success");
            } else {
                alert(response.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
        // console.log("click save user: ", user);
    };
    render() {
        // console.log("check state user ", this.state);
        // console.log("id ", this.state.arrUsers);
        let arrUsers = this.state.arrUsers;
        return (
            <div
                className="users-container"
                style={{ marginRight: "200px", marginLeft: "200px" }}
            >
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUserFromParent={this.createNewUser}
                />
                {this.state.isOpenModalEditUser && (
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                )}

                <div className="title text-center">
                    {" "}
                    <FormattedMessage id="interface.title-manage-user" />
                </div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus px-2"></i>{" "}
                        <FormattedMessage id="interface.btn-create-user" />
                    </button>
                </div>
                <div className="users-table mt-4 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>Email</th>
                                <th>
                                    {" "}
                                    <FormattedMessage id="interface.infor-user.firstName" />
                                </th>
                                <th>
                                    <FormattedMessage id="interface.infor-user.lastName" />
                                </th>
                                <th>
                                    <FormattedMessage id="interface.infor-user.address" />
                                </th>
                                <th>
                                    <FormattedMessage id="interface.infor-user.gender" />
                                </th>
                                <th>
                                    <FormattedMessage id="interface.infor-user.roleId" />
                                </th>
                                <th>
                                    <FormattedMessage id="interface.infor-user.phonenumber" />
                                </th>
                                <th>
                                    <FormattedMessage id="interface.infor-user.positionId" />
                                </th>
                                <th>
                                    <FormattedMessage id="interface.actions" />
                                </th>
                            </tr>

                            {arrUsers &&
                                arrUsers.map((item, index) => {
                                    // const key = `${item.email}-${item.firstName}-${item.lastName}`;
                                    //console.log("check item", item);
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>{item.gender}</td>
                                            <td>{item.roleId}</td>
                                            <td>{item.phonenumber}</td>
                                            <td>{item.positionId}</td>
                                            <td>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() =>
                                                        this.handleEditUser(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() =>
                                                        this.handleDeleteUser(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
