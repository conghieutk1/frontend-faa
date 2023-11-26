import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageBooking.scss";
import DatePicker from "../../../components/Input/DatePicker";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
import {
    getListBookingAppointment,
    postSendAppointment,
} from "../../../services/userService";
import MoreInforPatientModal from "./MoreInforPatientModal";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingOverlay from "react-loading-overlay";
icon({ name: "xmark", family: "classic", style: "solid" });
icon({ name: "check", family: "classic", style: "solid" });
icon({ name: "info", family: "classic", style: "solid" });
const statusColors = {
    S1: "#00425A",
    S2: "#FFB84C",
    S3: "#1F8A70",
    S4: "#B31312",
};
class ManageBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf("day").valueOf(),
            dataBooking: [],
            isOpenMoreInforPatient: false,
            dataMoreInforPatientModal: {},
            isShowLoading: false,
        };
    }

    componentDidMount() {
        //moment.unix(+currentDate / 1000).format("DD/MM/YYYY");
        // lấy id người dùng qua props. cái này lấy ra khi sau khi đăng nhập thành công. video 99. phút 15.
        // project mình lấy full của các bác sĩ nên kh dùng biến này
        // let {user} = this.props;

        // Ở đây currntDate và formattedDate giống nhau kiểu unix timestamp(cái này chỉ đúng khi khởi tạo)
        //sau khi onchang datepicker thì currentDate sẽ thay đổi
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        this.getDataBooking(formattedDate);
    }
    getDataBooking = async (date) => {
        let res = await getListBookingAppointment({
            date: date.toString(),
        });
        //console.log("res = ", res);
        if (res && res.errCode === 0) {
            this.setState({
                dataBooking: res.data,
            });
        }
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
        //     if (prevProps.currentDate !== this.state.currentDate) {
        //         this.setState({
        //             currentDate: new Date(currentDate).getTime()
        //         })
        //     }
    }
    handleOnChangeDatePicker = (date) => {
        this.setState(
            {
                currentDate: date[0],
            },
            () => {
                let { currentDate } = this.state;
                let formattedDate = new Date(currentDate).getTime();
                this.getDataBooking(formattedDate);
            }
        );

        //check thì thấy 2 cách đều trả ra đầu ngày và giống nhau
        // console.log("-------------------");
        // console.log(
        //     "currentDate = ",
        //     moment(this.state.currentDate).startOf("day").valueOf()
        // );
        // console.log(
        //     "currentDate = ",
        //     new Date(this.state.currentDate).getTime()
        // );
        // console.log("-------------------");
    };
    buildDoctorName = (doctorDataBooking) => {
        let { language } = this.props;
        if (doctorDataBooking && !_.isEmpty(doctorDataBooking)) {
            let name =
                language === LANGUAGES.VI
                    ? `${doctorDataBooking.lastName} ${doctorDataBooking.firstName}`
                    : `${doctorDataBooking.firstName} ${doctorDataBooking.lastName}`;

            return name;
        }
        return "";
    };
    getTimeAppoint = (timeTypeDataBooking) => {
        let { language } = this.props;
        if (timeTypeDataBooking && !_.isEmpty(timeTypeDataBooking)) {
            let time =
                language === LANGUAGES.VI
                    ? `${timeTypeDataBooking.valueVi}`
                    : `${timeTypeDataBooking.valueEn}`;

            return time;
        }
        return "";
    };
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    buildDateBooking = (date) => {
        let { language } = this.props;
        if (date) {
            let _date =
                language === LANGUAGES.VI
                    ? this.capitalizeFirstLetter(
                          moment.unix(+date / 1000).format("dddd - DD/MM/YYYY")
                      )
                    : moment
                          .unix(+date / 1000)
                          .locale("en")
                          .format("ddd - DD/MM/YYYY");
            return `${_date}`;
        }
        return "";
    };
    handleCancelBooking = async (data) => {
        this.setState({
            isShowLoading: true,
        });
        let res = await postSendAppointment({
            doctorId: data.doctorId,
            patientId: data.patientID,
            timeType: data.timeType,
            date: data.date,
            statusId: data.statusId,
            button: "CANCEL",
            fullName: data.fullName,
            dateForEmail: this.buildDateBooking(data.date),
            language: this.props.language,
            emailPatient: data.patientData.email,
        });
        if (res && res.errCode === 0) {
            toast.success(res.errMessage);
        } else if (res && res.errCode === 2) {
            toast.error(res.errMessage);
        } else if (res && res.errCode === 3) {
            toast.info(res.errMessage);
        }
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        this.getDataBooking(formattedDate);
        this.setState({
            isShowLoading: false,
        });
    };
    handleConfirmBooking = async (data) => {
        this.setState({
            isShowLoading: true,
        });
        //console.log("data from each iteam handleConfirmBooking= ", data);
        let res = await postSendAppointment({
            doctorId: data.doctorId,
            patientId: data.patientID,
            timeType: data.timeType,
            date: data.date,
            statusId: data.statusId,
            button: "CONFIRM",
        });
        if (res && res.errCode === 0) {
            toast.success(res.errMessage);
        } else if (res && res.errCode === 3) {
            toast.error(res.errMessage);
        } else {
            toast.info(res.errMessage);
        }
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        this.getDataBooking(formattedDate);
        this.setState({
            isShowLoading: false,
        });
    };
    handleInfoBooking = (data) => {
        this.setState({
            isOpenMoreInforPatient: true,
            dataMoreInforPatientModal: data,
        });
    };
    closeMoreInfoPatientModal = () => {
        this.setState({
            isOpenMoreInforPatient: false,
        });
    };
    render() {
        //console.log("check state.dataBooking ", this.state);
        //  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let { language } = this.props;
        let { dataBooking, isOpenMoreInforPatient, dataMoreInforPatientModal } =
            this.state;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text="Loading..."
                >
                    <div className="manage-booking-container">
                        <div className="title">
                            <FormattedMessage id="manage-booking.title" />
                        </div>
                        <div className="manage-booking-body row mx-1">
                            <div className="col-4 form-group">
                                <label>Chọn ngày khám</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                    //minDate={yesterday}
                                />
                            </div>
                            <div className="col-12 form-group">
                                {dataBooking && dataBooking.length > 0 ? (
                                    <>
                                        <table id="TableManage">
                                            <tbody>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Email</th>
                                                    <th>
                                                        <FormattedMessage id="manage-booking.name" />
                                                    </th>

                                                    <th>
                                                        <FormattedMessage id="manage-booking.reason" />
                                                    </th>
                                                    <th>
                                                        <FormattedMessage id="manage-booking.doctorName" />
                                                    </th>
                                                    <th>
                                                        <FormattedMessage id="manage-booking.time" />
                                                    </th>
                                                    <th>
                                                        <FormattedMessage id="manage-booking.date" />
                                                    </th>
                                                    <th>
                                                        <FormattedMessage id="manage-booking.addressClinic" />
                                                    </th>
                                                    <th>
                                                        <FormattedMessage id="manage-booking.status" />
                                                    </th>
                                                    <th>
                                                        <FormattedMessage id="manage-booking.actions" />
                                                    </th>
                                                </tr>
                                                {dataBooking &&
                                                    dataBooking.length > 0 &&
                                                    dataBooking.map(
                                                        (item, index) => {
                                                            //let dob = new Date(item.dob).getTime();
                                                            // console.log("dob = ", item.dob);
                                                            return (
                                                                <tr key={index}>
                                                                    <td>
                                                                        {index +
                                                                            1}
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item
                                                                                .patientData
                                                                                .email
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item
                                                                                .patientData
                                                                                .firstName
                                                                        }
                                                                    </td>
                                                                    {/* <td>
                                                        {moment
                                                            .unix(
                                                                +item.dob / 1000
                                                            )
                                                            .format(
                                                                "DD/MM/YYYY"
                                                            )}
                                                    </td>
                                                    <td>
                                                        {language ===
                                                        LANGUAGES.VI
                                                            ? item.patientData
                                                                  .genderData
                                                                  .valueVi
                                                            : item.patientData
                                                                  .genderData
                                                                  .valueEn}
                                                    </td>
                                                    <td>{item.address}</td>
                                                    <td>{item.phoneNumber}</td> */}
                                                                    <td>
                                                                        {
                                                                            item.reason
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {this.buildDoctorName(
                                                                            item.doctorDataBooking
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {this.getTimeAppoint(
                                                                            item.timeTypeDataBooking
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {this.buildDateBooking(
                                                                            item.date
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            "Phòng khám Quốc tế EXSON"
                                                                        }
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            backgroundColor:
                                                                                statusColors[
                                                                                    item
                                                                                        ?.statusId
                                                                                ],
                                                                        }}
                                                                    >
                                                                        <div className="status">
                                                                            {language ===
                                                                            LANGUAGES.VI
                                                                                ? item
                                                                                      ?.statusDataBooking
                                                                                      ?.valueVi ||
                                                                                  ""
                                                                                : item
                                                                                      ?.statusDataBooking
                                                                                      ?.valueEn}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            className="btn-confirm"
                                                                            onClick={() =>
                                                                                this.handleConfirmBooking(
                                                                                    item
                                                                                )
                                                                            }
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={icon(
                                                                                    {
                                                                                        name: "check",
                                                                                    }
                                                                                )}
                                                                            />
                                                                        </button>
                                                                        <button
                                                                            className="btn-cancel"
                                                                            onClick={() =>
                                                                                this.handleCancelBooking(
                                                                                    item
                                                                                )
                                                                            }
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={icon(
                                                                                    {
                                                                                        name: "xmark",
                                                                                    }
                                                                                )}
                                                                            />
                                                                        </button>
                                                                        <button
                                                                            className="btn-info"
                                                                            onClick={() =>
                                                                                this.handleInfoBooking(
                                                                                    item
                                                                                )
                                                                            }
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={icon(
                                                                                    {
                                                                                        name: "info",
                                                                                    }
                                                                                )}
                                                                            />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                            </tbody>
                                        </table>
                                    </>
                                ) : (
                                    <div className="none-appointment">
                                        <FormattedMessage id="manage-booking.none-appointment" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <MoreInforPatientModal
                        isOpen={isOpenMoreInforPatient}
                        closeMoreInfoPatientModal={
                            this.closeMoreInfoPatientModal
                        }
                        dataModal={dataMoreInforPatientModal}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
