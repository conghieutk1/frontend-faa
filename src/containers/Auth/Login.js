import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../store/actions';
import { KeyCodeUtils } from '../../utils';
import './Login.scss';
import { handleLoginApi } from '../../services/userService';
import LoadingOverlay from 'react-loading-overlay';
import ModalCreateNewUser from './Modal/ModalCreateNewUser';
import { emitter } from '../../utils/emitter';
import { toast } from 'react-toastify';
import { createNewUserByReact } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPassword: false,
            errMessage: '',
            isShowLoading: false,
            isOpenModalCreateNewUser: false,
        };
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handlerKeyDown);
        this.setState({
            isShowLoading: false,
        });
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handlerKeyDown);
        this.setState({
            isShowLoading: false,
        });
    }

    handlerKeyDown = (event) => {
        const keyCode = event.which || event.keyCode;
        if (keyCode === KeyCodeUtils.ENTER) {
            this.handleLogin();
        }
    };

    handleOnChangeUserName = (e) => {
        this.setState({
            username: e.target.value,
        });
    };

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    handleLogin = async () => {
        // this.setState({
        //     isShowLoading: true,
        // });
        this.setState({
            errMessage: '',
            isShowLoading: true,
        });
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                    isShowLoading: false,
                });
            }
            if (data && data.errCode === 0) {
                console.log('loging success', data.user);
                this.props.userLoginSuccess(data.user);
                // Lưu thông tin userInfo vào localStorage
                localStorage.setItem('userInfo', JSON.stringify(data.user));
                //Cookies.set("userInfo", data.user);
                console.log('loging success');
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message,
                        isShowLoading: false,
                    });
                }
            }
            console.log('error message', e.response);
        }
    };

    handleRegister = async () => {
        this.setState({
            isOpenModalCreateNewUser: true,
        });
    };
    toggleUserModal = () => {
        this.setState({
            isOpenModalCreateNewUser: !this.state.isOpenModalCreateNewUser,
        });
    };
    handleShowHidePassword = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        });
        //console.log(this.state.showPassword);
    };
    createNewUser = async (data) => {
        try {
            console.log('check data register: ', data);
            let response = await createNewUserByReact(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                // await this.getAllUserFromReact();
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
                this.setState({
                    isOpenModalCreateNewUser: false,
                });
                toast.success('Create user success');

                // truyen data
                // emitter.emit("EVENT_CLEAR_MODAL_DATA", {id : 'abc'});
            }
        } catch (e) {
            console.log(e);
        }
    };
    render() {
        return (
            <LoadingOverlay active={this.state.isShowLoading} spinner text="Loading	...">
                <div className="login-background">
                    <div className="login-container">
                        <ModalCreateNewUser
                            isOpen={this.state.isOpenModalCreateNewUser}
                            toggleFromParent={this.toggleUserModal}
                            createNewUserFromParent={this.createNewUser}
                        />
                        <div className="login-content row">
                            <div className="col-12 text-center login-title">Login</div>
                            <div className="col-12 form-group">
                                <label>Username: </label>
                                <input
                                    type="text"
                                    className="form-control login-input"
                                    placeholder="Enter your user name"
                                    value={this.state.username}
                                    onChange={(e) => this.handleOnChangeUserName(e)}
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label>Password: </label>
                                <div className="login-password">
                                    <input
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        className="form-control login-input"
                                        placeholder="Enter your password"
                                        value={this.state.password}
                                        onChange={(e) => this.handleOnChangePassword(e)}
                                    />
                                    <span onClick={() => this.handleShowHidePassword()}>
                                        <i
                                            className={
                                                this.state.showPassword
                                                    ? 'fas fa-eye show-password'
                                                    : 'fas fa-eye-slash show-password'
                                            }
                                        ></i>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12" style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                            <div className="col-12">
                                <button className="btn-login" onClick={() => this.handleLogin()}>
                                    Login
                                </button>
                            </div>

                            <div className="col-12">
                                <span className="forgot-password">Forgot your password?</span>
                            </div>
                            <div className="col-12 text-center login-with mt-3">
                                <span className="">Or login with:</span>
                            </div>
                            <div className="col-12 social-login">
                                <i className="fab fa-facebook-f social-icon fb"></i>
                                <i className="fab fa-google-plus-g social-icon gg"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),

        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { push } from "connected-react-router";

// import * as actions from "../../store/actions";

// import "./Login.scss";
// import { FormattedMessage } from "react-intl";
// //import { divide } from "lodash";
// // import { userService } from "../../services";
// import { handleLoginApi } from "../../services/userService";

// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: "",
//             password: "",
//             isShowPassword: false,
//             errMessage: "",
//         };
//         this.btnLogin = React.createRef();
//     }

//     handleOnChangeUser = (event) => {
//         this.setState({
//             username: event.target.value,
//         });
//     };
//     handleOnChangePass = (event) => {
//         this.setState({
//             password: event.target.value,
//         });
//     };
//     handleLogin = async () => {
//         // console.log(this.state.username);
//         // console.log(this.state.password);
//         this.setState({
//             errMessage: "",
//         });
//         try {
//             let data = await handleLoginApi(
//                 this.state.username,
//                 this.state.password
//             );
//             if (data && data.errCode !== 0) {
//                 this.setState({
//                     errMessage: data.message,
//                 });
//             }
//             if (data && data.errCode === 0) {
//                 this.props.userLoginSuccess(data.user);
//                 console.log("loging success");
//             }
//         } catch (error) {
//             //console.log(e);

//             if (error.response) {
//                 if (error.response.data) {
//                     this.setState({
//                         errorMessage: error.response.data.message,
//                     });
//                 }
//             }
//         }
//     };
//     handleShowHidePassword = () => {
//         this.setState({
//             isShowPassword: !this.state.isShowPassword,
//         });
//     };
//     render() {
//         return (
//             <div className="login-background">
//                 <div className="login-container">
//                     <div className="login-content row">
//                         <div className="col-12 text-login">Login</div>
//                         <div className="col-12 form-group input-login">
//                             <label>Username</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Enter your username"
//                                 value={this.state.username}
//                                 onChange={(event) =>
//                                     this.handleOnChangeUser(event)
//                                 }
//                             />
//                         </div>
//                         <div className="col-12 form-group input-login">
//                             <label>Password</label>
//                             <div className="custom-input-password">
//                                 <input
//                                     type={
//                                         this.state.isShowPassword
//                                             ? "text"
//                                             : "password"
//                                     }
//                                     className="form-control"
//                                     placeholder="Enter your password"
//                                     value={this.state.password}
//                                     onChange={(event) =>
//                                         this.handleOnChangePass(event)
//                                     }
//                                 />
//                                 <span
//                                     onClick={() =>
//                                         this.handleShowHidePassword()
//                                     }
//                                 >
//                                     <i
//                                         className={
//                                             this.state.isShowPassword
//                                                 ? "far fa-eye"
//                                                 : "far fa-eye-slash"
//                                         }
//                                     ></i>
//                                 </span>
//                             </div>
//                         </div>
//                         <div className="col-12" style={{ color: "red" }}>
//                             {this.state.errMessage}
//                         </div>
//                         <div className="col-12">
//                             <button
//                                 className="btn-login"
//                                 onClick={() => {
//                                     this.handleLogin();
//                                 }}
//                             >
//                                 Login
//                             </button>
//                         </div>
//                         <div className="col-12">
//                             <span className="fogot-password">
//                                 Forgot your password?
//                             </span>
//                         </div>
//                         <div className="col-12 text-center mt-3">
//                             <span className="text-other-login">
//                                 Or login with:
//                             </span>
//                         </div>
//                         <div className="col-12 social-login">
//                             <i className="fab fa-google-plus-g google"></i>
//                             <i className="fab fa-facebook-f facebook"></i>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         language: state.app.language,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         navigate: (path) => dispatch(push(path)),
//         adminLoginSuccess: (adminInfo) =>
//             dispatch(actions.adminLoginSuccess(adminInfo)),
//         adminLoginFail: () => dispatch(actions.adminLoginFail()),
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
