import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment/moment";

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        });
    }
    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            // this.getInforDoctor(this.props.doctorId);
        }
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    renderTimeBooking = (dataTime) => {
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
            return (
                <>
                    <div className="left col-6">
                        <FormattedMessage id="patient.modal-booking.time" />{" "}
                        {time}, {date}
                    </div>
                    <div className="right col-6">
                        <FormattedMessage id="patient.modal-booking.free-booking" />
                    </div>
                </>
            );
        }
        return <></>;
    };
    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescriptionDoctor, dataTime } = this.props;
        //console.log("state: ", this.state);
        let nameVi = "",
            nameEn = "";
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div className="content-right">
                        <div className="up">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="down">
                            {isShowDescriptionDoctor === true ? (
                                <>
                                    {dataProfile &&
                                        dataProfile.Markdown &&
                                        dataProfile.Markdown.description && (
                                            <span>
                                                {
                                                    dataProfile.Markdown
                                                        .description
                                                }
                                            </span>
                                        )}
                                </>
                            ) : (
                                <>{this.renderTimeBooking(dataTime)}</>
                            )}
                        </div>
                    </div>
                </div>
                <div className="price">
                    <div className="fee">
                        <FormattedMessage id="patient.extra-infor.price" />:
                    </div>
                    {dataProfile &&
                    dataProfile.Doctor_Infor &&
                    language === LANGUAGES.VI ? (
                        <NumberFormat
                            className="currency"
                            value={
                                dataProfile.Doctor_Infor.priceTypeData.valueVi
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"VND"}
                        />
                    ) : (
                        ""
                    )}
                    {dataProfile &&
                    dataProfile.Doctor_Infor &&
                    language === LANGUAGES.EN ? (
                        <NumberFormat
                            className="currency"
                            value={
                                dataProfile.Doctor_Infor.priceTypeData.valueEn
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"$"}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
