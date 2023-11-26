import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManage.scss";
import * as actions from "../../../store/actions";
// import {
//     getAllUsers,
//     createNewUserByReact,
//     deleteUserByReact,
//     editUserByReact,
// } from "../../services/userService";
// import ModalUser from "./ModalUser";
// import ModalEditUser from "./ModalEditUser";
// import { emitter } from "../../utils/emitter";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log("handleEditorChange", html, text);
}

class TableManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
        };
    }

    componentDidMount() {
        this.props.fetchUsersRedux();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers,
            });
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id);
    };
    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user);
    };
    render() {
        // console.log("check  all users: ", this.props.listUsers);
        //console.log("check this.state.usersRedux: ", this.state.usersRedux);
        let arrUsers = this.state.usersRedux;
        return (
            <React.Fragment>
                <table id="TableManage">
                    <tbody>
                        <tr>
                            <th>STT</th>
                            <th>Email</th>
                            <th>
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
                            arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                return (
                                    <tr key={item.id}>
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
                                                    this.handleEditUser(item)
                                                }
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() =>
                                                    this.handleDeleteUser(item)
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
                <div style={{ height: "50px" }}></div>
                <MdEditor
                    style={{ height: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                />{" "}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManage);
