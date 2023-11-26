import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
//import { getAllCodeService } from "../../../services/userService";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManage from "./TableManage";
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: "",
            isOpen: false,

            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            gender: "",
            position: "",
            role: "",
            avatar: "",

            action: "",
            userEditId: "",
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let res = await getAllCodeService("GENDER");
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data,
        //         });
        //     }
        //     res = await getAllCodeService("POSITION");
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             positionArr: res.data,
        //         });
        //     }
        //     res = await getAllCodeService("ROLE");
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             roleArr: res.data,
        //         });
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender:
                    arrGenders && arrGenders.length > 0
                        ? arrGenders[0].keyMap
                        : "",
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                position:
                    arrPositions && arrPositions.length > 0
                        ? arrPositions[0].keyMap
                        : "",
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
            });
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrPositions = this.props.positionRedux;
            let arrRoles = this.props.roleRedux;
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",
                gender:
                    arrGenders && arrGenders.length > 0
                        ? arrGenders[0].keyMap
                        : "",
                position:
                    arrPositions && arrPositions.length > 0
                        ? arrPositions[0].keyMap
                        : "",
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
                avatar: "",
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: "",
            });
        }
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            //console.log("check base64: ", base64);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64,
            });
        }
    };
    openPreviewImage = (event) => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        });
    };
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            // fire redux action
            //console.log("check before", this.state);
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            });
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editAUserRedux({
                id: this.state.userEditId,
                //email: this.state.email,
                //password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            });
        }

        this.props.fetchUsersRedux();
    };
    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
        // email: '',
        //     password: '',
        //     firstName: '',
        //     lastName: '',
        //     phoneNumber: '',
        //     address: '',
        //     gender: '',
        //     position: '',
        //     role: '',
        //     avatar: ''
    };
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = [
            "email",
            "password",
            "firstName",
            "lastName",
            "phoneNumber",
            "address",
        ];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert("Missing parameter: " + arrCheck[i]);
                break;
            }
        }
        return isValid;
    };

    handleEditUserFromParent = (user) => {
        // console.log("check handle edit", user);
        let imageBase64 = "";
        if (user.image) {
            imageBase64 = new Buffer(user.image, "base64").toString("binary");
        }
        this.setState({
            email: user.email,
            password: "hardcode",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            phoneNumber: user.phonenumber || "",
            address: user.address || "",
            gender: user.gender || "M",
            position: user.positionId || "",
            role: user.roleId || "",
            avatar: "",
            previewImgURL: imageBase64 || "",
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id || "",
        });
    };

    setCreateUser = () => {
        let arrGenders = this.props.genderRedux;
        let arrPositions = this.props.positionRedux;
        let arrRoles = this.props.roleRedux;
        this.setState({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            gender:
                arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
            position:
                arrPositions && arrPositions.length > 0
                    ? arrPositions[0].keyMap
                    : "",
            role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
            previewImgURL: "",
            avatar: "",
            action: CRUD_ACTIONS.CREATE,
        });
    };

    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let isLoadingGender = this.props.isLoadingGender;
        let isLoadingPosition = this.props.isLoadingPosition;
        let isLoadingRole = this.props.isLoadingRole;
        let {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            gender,
            position,
            role,
            avatar,
        } = this.state;

        //console.log("check state", this.props);
        return (
            <div className="user-redux-container">
                <div className="title">
                    <FormattedMessage id="interface.title-user-redux" />
                </div>

                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="label-adduser col-12">
                                <button
                                    className="btn-add-redux btn btn-primary"
                                    onClick={() => this.setCreateUser()}
                                >
                                    <FormattedMessage id="manage-user.add" />
                                </button>
                            </div>
                            <div className="col-12 my-3">
                                {isLoadingGender === true ||
                                isLoadingPosition === true ||
                                isLoadingRole === true
                                    ? "Loading..."
                                    : ""}
                            </div>

                            <div className="col-3 my-1">
                                <label>
                                    <FormattedMessage id="manage-user.email" />
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    value={email}
                                    onChange={(event) => {
                                        this.onChangeInput(event, "email");
                                    }}
                                    disabled={
                                        this.state.action === CRUD_ACTIONS.EDIT
                                            ? true
                                            : false
                                    }
                                />
                            </div>
                            <div className="col-3 my-1">
                                <label>
                                    <FormattedMessage id="manage-user.password" />
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={(event) => {
                                        this.onChangeInput(event, "password");
                                    }}
                                    disabled={
                                        this.state.action === CRUD_ACTIONS.EDIT
                                            ? true
                                            : false
                                    }
                                />
                            </div>
                            <div className="col-3 my-1">
                                <label>
                                    <FormattedMessage id="manage-user.firstname" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={firstName}
                                    onChange={(event) => {
                                        this.onChangeInput(event, "firstName");
                                    }}
                                />
                            </div>
                            <div className="col-3 my-1">
                                <label>
                                    <FormattedMessage id="manage-user.lastname" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={lastName}
                                    onChange={(event) => {
                                        this.onChangeInput(event, "lastName");
                                    }}
                                />
                            </div>
                            <div className="col-3 my-1">
                                <label>
                                    <FormattedMessage id="manage-user.phonenumber" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(event) => {
                                        this.onChangeInput(
                                            event,
                                            "phoneNumber"
                                        );
                                    }}
                                />
                            </div>
                            <div className="col-9 my-1">
                                <label>
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={address}
                                    onChange={(event) => {
                                        this.onChangeInput(event, "address");
                                    }}
                                />
                            </div>
                            <div className="col-3 my-1">
                                <label>
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <select
                                    className="form-control"
                                    onChange={(event) => {
                                        this.onChangeInput(event, "gender");
                                    }}
                                    value={gender}
                                >
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item.keyMap}
                                                >
                                                    {language === LANGUAGES.VI
                                                        ? item.valueVi
                                                        : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3 my-1">
                                <label>
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select
                                    className="form-control"
                                    onChange={(event) => {
                                        this.onChangeInput(event, "position");
                                    }}
                                    value={position}
                                >
                                    {positions &&
                                        positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item.keyMap}
                                                >
                                                    {language === LANGUAGES.VI
                                                        ? item.valueVi
                                                        : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3 my-1">
                                <label>
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select
                                    className="form-control"
                                    onChange={(event) => {
                                        this.onChangeInput(event, "role");
                                    }}
                                    value={role}
                                >
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item.keyMap}
                                                >
                                                    {language === LANGUAGES.VI
                                                        ? item.valueVi
                                                        : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3 my-1">
                                <label>
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <div className="preview-img-container">
                                    <input
                                        id="previewImg"
                                        className="form-control"
                                        type="file"
                                        hidden
                                        onChange={(event) =>
                                            this.handleOnChangeImage(event)
                                        }
                                    />
                                    <label
                                        className="label-upload"
                                        htmlFor="previewImg"
                                    >
                                        Tải ảnh{" "}
                                        <i className="fas fa-upload"></i>
                                    </label>
                                    <div
                                        className="preview-image"
                                        style={{
                                            backgroundImage: `url(${this.state.previewImgURL})`,
                                        }}
                                        onClick={() => this.openPreviewImage()}
                                    ></div>
                                </div>
                            </div>
                            <div className="col-12 mt-2">
                                <button
                                    className={
                                        this.state.action === CRUD_ACTIONS.EDIT
                                            ? "btn-save-redux btn btn-warning"
                                            : "btn-save-redux btn btn-primary"
                                    }
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                                        <FormattedMessage id="manage-user.edit" />
                                    ) : (
                                        <FormattedMessage id="manage-user.save" />
                                    )}
                                </button>
                            </div>
                            <div className="col-12 mb-5">
                                <TableManage
                                    handleEditUserFromParentKey={
                                        this.handleEditUserFromParent
                                    }
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isOpen === true && (
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log("check props asfasmkfaf", this.props);
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        isLoadingPosition: state.admin.isLoadingPosition,
        isLoadingRole: state.admin.isLoadingRole,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data)),

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) =>
        //     dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
