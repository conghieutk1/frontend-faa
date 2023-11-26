import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import NumberFormat from "react-number-format";
import { LANGUAGES } from "../../../utils";
import { getExtraInforDoctorById } from "../../../services/userService";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {},
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(
                this.props.doctorIdFromParent
            );
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data,
                });
            }
        }
    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status,
        });
    };
    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props;
        //console.log("check state ", this.state);

        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-title-mini">
                        <FormattedMessage id="patient.extra-infor.text-title-mini" />{" "}
                    </div>
                    <div className="name-clinic">
                        {extraInfor && extraInfor.nameClinic
                            ? extraInfor.nameClinic
                            : ""}
                    </div>
                    <div className="detail-address">
                        {extraInfor && extraInfor.addressClinic
                            ? extraInfor.addressClinic
                            : ""}
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false && (
                        <div className="price-1">
                            <div className="fee">
                                <FormattedMessage id="patient.extra-infor.price" />
                                :
                            </div>
                            {extraInfor &&
                                extraInfor.priceTypeData &&
                                language === LANGUAGES.VI && (
                                    <NumberFormat
                                        className="currency"
                                        value={extraInfor.priceTypeData.valueVi}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        suffix={"VND"}
                                    />
                                )}
                            {extraInfor &&
                                extraInfor.priceTypeData &&
                                language === LANGUAGES.EN && (
                                    <NumberFormat
                                        className="currency"
                                        value={extraInfor.priceTypeData.valueEn}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        suffix={"$"}
                                    />
                                )}
                            <span
                                className="btn-showhide"
                                onClick={() => this.showHideDetailInfor(true)}
                            >
                                <FormattedMessage id="patient.extra-infor.show-more" />
                            </span>
                        </div>
                    )}
                    {isShowDetailInfor === true && (
                        <>
                            <div className="text-title-mini">
                                <FormattedMessage id="patient.extra-infor.price" />
                            </div>
                            <div className="detail-infor">
                                <div className="price">
                                    <span className="left">
                                        <FormattedMessage id="patient.extra-infor.price" />
                                    </span>
                                    <span className="right">
                                        {extraInfor &&
                                            extraInfor.priceTypeData &&
                                            language === LANGUAGES.VI && (
                                                <NumberFormat
                                                    className="currency"
                                                    value={
                                                        extraInfor.priceTypeData
                                                            .valueVi
                                                    }
                                                    displayType={"text"}
                                                    thousandSeparator={true}
                                                    suffix={"VND"}
                                                />
                                            )}
                                        {extraInfor &&
                                            extraInfor.priceTypeData &&
                                            language === LANGUAGES.EN && (
                                                <NumberFormat
                                                    className="currency"
                                                    value={
                                                        extraInfor.priceTypeData
                                                            .valueEn
                                                    }
                                                    displayType={"text"}
                                                    thousandSeparator={true}
                                                    suffix={"$"}
                                                />
                                            )}
                                    </span>
                                </div>
                                <div className="note">
                                    {extraInfor && extraInfor.note
                                        ? extraInfor.note
                                        : ""}
                                </div>
                            </div>

                            <div className="payment">
                                <FormattedMessage id="patient.extra-infor.text-payment" />
                                {extraInfor &&
                                extraInfor.paymentTypeData &&
                                language === LANGUAGES.VI
                                    ? extraInfor.paymentTypeData.valueVi
                                    : ""}
                                {extraInfor &&
                                extraInfor.paymentTypeData &&
                                language === LANGUAGES.EN
                                    ? extraInfor.paymentTypeData.valueEn
                                    : ""}
                            </div>
                            <span
                                className="btn-showhide"
                                onClick={() => this.showHideDetailInfor(false)}
                            >
                                <FormattedMessage id="patient.extra-infor.hide" />
                            </span>
                        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
