import React, { Component } from "react";
import "./BookingModal.scss";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../../utils";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { postPatientBookingAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment/moment";

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            fullName: "",
            phoneNumber: "",
            address: "",
            gender: "",
            dob: "",
            reason: "",
            doctorId: "",
            genderArr: [],
            timeType: "",
            date: "",
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
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
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                //console.log("dataTime = ", this.props.dataTime);
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                let date = this.props.dataTime.date;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                    date: date,
                });
            }
        }
    }
    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy,
        });
    };
    handleOnChangeDatePicker = (date) => {
        if (date) {
            this.setState({
                dob: date[0],
            });
        }
    };
    handleConfirmBooking = async () => {
        let dob = new Date(this.state.dob).getTime();
        console.log("dob = ", dob);
        console.log("this.props.date = ", this.state.date);
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        let res = await postPatientBookingAppointment({
            email: this.state.email,
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            gender: this.state.gender,
            dob: dob.toString(),
            reason: this.state.reason,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            date: this.state.date,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        });
        if (res && res.errCode === 0) {
            toast.success("Booking a new appointment succeed!");
            this.props.closeBooking();
        } else if (res && res.errCode === 4) {
            toast.info("This appointment already exists!");
            this.props.closeBooking();
        } else {
            toast.error(
                "Booking a new appointment error, please try again later!"
            );
            this.props.closeBooking();
        }
    };
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time =
                language === LANGUAGES.VI
                    ? dataTime.timeTypeData.valueVi
                    : dataTime.timeTypeData.valueEn;
            let date =
                language === LANGUAGES.VI
                    ? this.capitalizeFirstLetter(
                          moment
                              .unix(+dataTime.date / 1000)
                              .format("dddd - DD/MM/YYYY")
                      )
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale("en")
                          .format("ddd - DD/MM/YYYY");
            return `${time}, ${date}`;
        }
        return "";
    };
    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name =
                language === LANGUAGES.VI
                    ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                    : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;

            return name;
        }
        return "";
    };
    render() {
        let genders = this.state.genderArr;
        let { isOpen, closeBooking, dataTime, language } = this.props;
        let doctorId = "";
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }
        let { gender } = this.state;
        //console.log("modal state = ", this.state);
        return (
            <Modal
                isOpen={isOpen}
                className={"booking-modal"}
                size="lg"
                centered
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">
                            <FormattedMessage id="patient.modal-booking.title" />
                        </span>
                        <span className="right" onClick={closeBooking}>
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="booking-modal-body">
                        <div className="doctor-infor">
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>

                        <div className="row">
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.modal-booking.name" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.fullName}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "fullName"
                                        )
                                    }
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.modal-booking.phonenumber" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.phoneNumber}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "phoneNumber"
                                        )
                                    }
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.modal-booking.email" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(event, "email")
                                    }
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.modal-booking.address" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.address}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "address"
                                        )
                                    }
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label>
                                    <FormattedMessage id="patient.modal-booking.reason" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.reason}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "reason"
                                        )
                                    }
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.modal-booking.dob" />
                                </label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.dob}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.modal-booking.gender" />
                                </label>
                                <select
                                    className="form-control"
                                    onChange={(event) => {
                                        this.handleOnChangeInput(
                                            event,
                                            "gender"
                                        );
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
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button
                            className="btn-booking-confirm"
                            onClick={() => this.handleConfirmBooking()}
                        >
                            <FormattedMessage id="patient.modal-booking.btn-confirm" />
                        </button>
                        <button
                            className="btn-booking-cancel"
                            onClick={closeBooking}
                        >
                            <FormattedMessage id="patient.modal-booking.btn-cancel" />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
