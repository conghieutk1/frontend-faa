import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { postVerifyBookingAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import "./VerifyEmailBooking.scss";

class VerifyEmailBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,
        };
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get("token");
            let doctorId = urlParams.get("doctorId");
            // console.log(token, doctorId);

            let res = await postVerifyBookingAppointment({
                token: token,
                doctorId: doctorId,
            });

            if (res && res.errCode == 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                });
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
    }

    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <>
                <HomeHeader />
                <div className="verify-booking-container">
                    {statusVerify === false ? (
                        <div className="infor-booking">Loading...</div>
                    ) : (
                        <div>
                            {errCode === 0 ? (
                                <div className="infor-booking">
                                    Xác nhận lịch hẹn thành công!
                                </div>
                            ) : (
                                <div className="infor-booking">
                                    Lịch hẹn đã tồn tại hoặc đã được xác nhận!
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailBooking);
