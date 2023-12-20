import React, { Component } from 'react';
import { render } from 'react-dom';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageUsers.scss';
import * as actions from '../../store/actions';
// import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManage from './Modal/TableManage';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../utils';
class ManageUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            confirmPassword: '',
            action: CRUD_ACTIONS.CREATE,
        };
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['account', 'password', 'confirmPassword'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrCheck[i]);
                break;
            }
        }
        if (this.state.password !== this.state.confirmPassword) {
            isValid = false;
            alert('Password not match!');
        }
        return isValid;
    };
    handleEditUserFromParent = (user) => {
        // console.log("check handle edit", user);
        this.setState({
            account: user.account,
            password: 'hardcode',
            confirmPassword: 'hardcode',
            action: CRUD_ACTIONS.EDIT,
        });
    };
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        // console.log('check action: ', action);
        // console.log('check state: ', this.state);
        if (action === CRUD_ACTIONS.CREATE) {
            // fire redux action
            //console.log("check before", this.state);
            this.props.createNewUser({
                account: this.state.account,
                password: this.state.password,
            });
            this.setState({
                account: '',
                password: '',
                confirmPassword: '',
                action: CRUD_ACTIONS.CREATE,
            });
        }
        if (action === CRUD_ACTIONS.EDIT) {
            // this.props.editAUserRedux({
            //     id: this.state.userEditId,
            //     //email: this.state.email,
            //     //password: this.state.password,

            // });
            alert('Currently cannot be edited');
        }

        this.props.fetchUsersRedux();
    };
    setCreateUser = () => {
        this.setState({
            account: '',
            password: '',
            confirmPassword: '',
            action: CRUD_ACTIONS.CREATE,
        });
    };
    render() {
        let { account, password, confirmPassword } = this.state;
        return (
            <div className="user-redux-container">
                <div className="title">Manage Users</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="label-adduser col-12">
                                <button className="btn-add-redux btn btn-primary" onClick={() => this.setCreateUser()}>
                                    Thêm mới người dùng
                                </button>
                            </div>
                            <div className="col-3 my-1">
                                <label>Tài khoản</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={account}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'account');
                                    }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className="col-3 my-1">
                                <label>Mật khẩu</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'password');
                                    }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className="col-3 my-1">
                                <label>Xác nhận mật khẩu</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'confirmPassword');
                                    }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className="col-12 mt-2">
                                <button
                                    className={
                                        this.state.action === CRUD_ACTIONS.EDIT
                                            ? 'btn-save-redux btn btn-warning'
                                            : 'btn-save-redux btn btn-primary'
                                    }
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ? 'Edit' : 'Save'}
                                </button>
                            </div>
                            <div className="col-4 mb-5">
                                <TableManage
                                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
