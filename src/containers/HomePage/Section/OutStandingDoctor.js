import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
//import { withRouter } from "react-router";
import { withRouter } from "react-router-dom";

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            });
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }
    handleViewDetailDoctor = (doctor) => {
        console.log("check viewinfor: ", doctor);
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    };

    render() {
        let allDoctors = this.state.arrDoctors;
        allDoctors = allDoctors.concat(allDoctors);
        //     .concat(allDoctors)
        //     .concat(allDoctors);
        let { language } = this.props;
        // console.log("check topDoctorsRedux: ", this.props.topDoctorsRedux);
        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.outstanding-doctor" />
                        </span>
                        <button className="button-section">
                            <FormattedMessage id="homepage.moreinfo" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {allDoctors &&
                                allDoctors.length > 0 &&
                                allDoctors.map((item, index) => {
                                    let imageBase64 = "";
                                    if (item.image) {
                                        imageBase64 = new Buffer(
                                            item.image,
                                            "base64"
                                        ).toString("binary");
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                    return (
                                        <div
                                            className="section-customize"
                                            key={index}
                                            onClick={() =>
                                                this.handleViewDetailDoctor(
                                                    item
                                                )
                                            }
                                        >
                                            <div
                                                className="bg-img1 "
                                                style={{
                                                    backgroundImage: `url(${imageBase64})`,
                                                }}
                                            ></div>
                                            <div className="text-img">
                                                <div>
                                                    {language === LANGUAGES.VI
                                                        ? nameVi
                                                        : nameEn}
                                                </div>
                                                <div>
                                                    Sức khỏe tâm thần - Tư vấn
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin.dataDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
