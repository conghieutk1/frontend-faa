import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import Select from "react-select";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";

// import {
//     getAllUsers,
//     createNewUserByReact,
//     deleteUserByReact,
//     editUserByReact,
// } from "../../services/userService";
// import ModalUser from "./ModalUser";
// import ModalEditUser from "./ModalEditUser";
// import { emitter } from "../../utils/emitter";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // table markdown
            contentMarkdown: "",
            contentHTML: "",
            selectedOption: "",
            description: "",
            listDoctors: [],
            hasOldData: false,

            // save for table dotor_infor
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: "",
            selectedPayment: "",
            selectedProvince: "",
            nameClinic: "",
            addressClinic: "",
            note: "",

            allRequiredDoctorInfor: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getRequiredDoctorInforStart();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === "USERS") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;

                    object.label =
                        language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                });
            }
            if (type === "PRICE") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} VND`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label =
                        language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
            if (type === "PAYMENT" || type === "PROVINCE") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label =
                        language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
        }
        return result;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(
                this.props.allDoctors,
                "USERS"
            );
            this.setState({
                listDoctors: dataSelect,
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(
                this.props.allDoctors,
                "USERS"
            );
            let { resPrice, resPayment, resProvince } =
                this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
            let dataSelectPayment = this.buildDataInputSelect(
                resPayment,
                "PAYMENT"
            );
            let dataSelectProvince = this.buildDataInputSelect(
                resProvince,
                "PROVINCE"
            );
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            });
        }
        if (
            prevProps.allRequiredDoctorInfor !==
            this.props.allRequiredDoctorInfor
        ) {
            let { resPrice, resPayment, resProvince } =
                this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
            let dataSelectPayment = this.buildDataInputSelect(
                resPayment,
                "PAYMENT"
            );
            let dataSelectProvince = this.buildDataInputSelect(
                resProvince,
                "PROVINCE"
            );

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            });
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
        // console.log("handleEditorChange", html, text);
    };

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHTML,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action:
                hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        });
        //console.log("check saveDetailDoctor: ", this.state);
    };

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPrice, listPayment, listProvince } = this.state;
        let res = await getDetailInforDoctor(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;

            let addressClinic = "",
                nameClinic = "",
                note = "",
                paymentId = "",
                priceId = "",
                provinceId = "",
                selectedPrice = "",
                selectedPayment = "",
                selectedProvince = "";

            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                selectedPayment = listPayment.find((item) => {
                    return item && item.value === paymentId;
                });
                selectedPrice = listPrice.find((item) => {
                    return item && item.value === priceId;
                });
                selectedProvince = listProvince.find((item) => {
                    return item && item.value === provinceId;
                });
            }

            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
            });
        } else {
            this.setState({
                contentMarkdown: "",
                contentHTML: "",
                description: "",
                hasOldData: false,
                addressClinic: "",
                nameClinic: "",
                note: "",
            });
        }
        console.log("check ", res);
    };

    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy,
        });
    };
    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        //console.log("check state: ", this.state);

        this.setState({
            ...stateCopy,
        });
    };
    render() {
        // console.log("check  all users: ", this.props.listUsers);
        // console.log("check  state: ", this.state.usersRedux);
        //console.log("check listDoctors: ", this.state);
        let { hasOldData } = this.state;
        return (
            <div
                className="manage-doctor-container"
                style={{ marginRight: "200px", marginLeft: "200px" }}
            >
                <div className="title">
                    {" "}
                    <FormattedMessage id="interface.manage-doctor.title-manage-doctor" />
                </div>
                <div className="body-manage-doctor">
                    <div className="more-infor">
                        <div className="content-left">
                            <label className="text">
                                <FormattedMessage id="interface.manage-doctor.choose-doctor" />
                            </label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                                placeholder={
                                    <FormattedMessage id="interface.manage-doctor.choose-doctor" />
                                }
                            />
                        </div>
                        <div className="content-right">
                            <label className="text">
                                <FormattedMessage id="interface.manage-doctor.infor-intro" />
                            </label>
                            <textarea
                                className="form-control"
                                rows="4"
                                onChange={(event) =>
                                    this.handleOnChangeText(
                                        event,
                                        "description"
                                    )
                                }
                                value={this.state.description}
                            ></textarea>
                        </div>
                    </div>
                    <div className="more-infor-2 row">
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="interface.manage-doctor.price" />
                            </label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPrice}
                                placeholder={
                                    <FormattedMessage id="interface.manage-doctor.choose-price" />
                                }
                                name="selectedPrice"
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="interface.manage-doctor.payment" />
                            </label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPayment}
                                placeholder={
                                    <FormattedMessage id="interface.manage-doctor.choose-payment" />
                                }
                                name="selectedPayment"
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="interface.manage-doctor.province" />
                            </label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listProvince}
                                placeholder={
                                    <FormattedMessage id="interface.manage-doctor.choose-province" />
                                }
                                name="selectedProvince"
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="interface.manage-doctor.nameClinic" />
                            </label>
                            <input
                                className="form-control"
                                onChange={(event) =>
                                    this.handleOnChangeText(event, "nameClinic")
                                }
                                value={this.state.nameClinic}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="interface.manage-doctor.addressClinic" />
                            </label>
                            <input
                                className="form-control"
                                onChange={(event) =>
                                    this.handleOnChangeText(
                                        event,
                                        "addressClinic"
                                    )
                                }
                                value={this.state.addressClinic}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="interface.manage-doctor.note" />
                            </label>
                            <input
                                className="form-control"
                                onChange={(event) =>
                                    this.handleOnChangeText(event, "note")
                                }
                                value={this.state.note}
                            />
                        </div>
                    </div>
                    <div style={{ height: "50px" }}></div>
                    <MdEditor
                        style={{ height: "500px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />{" "}
                </div>
                <button
                    className={
                        hasOldData === true
                            ? "save-content-doctor"
                            : "create-content-doctor"
                    }
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    {hasOldData === true ? (
                        <span>Lưu thông tin</span>
                    ) : (
                        <span>Tạo thông tin</span>
                    )}
                </button>
                <div style={{ height: "100px" }}></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getRequiredDoctorInforStart: () =>
            dispatch(actions.getRequiredDoctorInforStart()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
