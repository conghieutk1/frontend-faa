import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital } from "@fortawesome/free-regular-svg-icons";
import {
    faMobileButton,
    faBookMedical,
    faMicroscope,
    faBrain,
    faTooth,
    faBedPulse,
    faTruckMedical,
    faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";

class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    };

    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div
                    className="home-header-container"
                    style={{
                        backgroundColor: "white",
                        border: this.props.isShowDetailHeader
                            ? ""
                            : "1px solid #ddd",
                    }}
                >
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div
                                className="header-logo"
                                onClick={() => this.returnToHome()}
                            ></div>
                        </div>

                        {this.props.isShowDetailHeader === true ? (
                            <div className="center-content">
                                <div className="child-content">
                                    <div>
                                        <b>
                                            <FormattedMessage id="homeheader.speciality" />
                                        </b>
                                    </div>
                                    <div className="subs-title">
                                        <FormattedMessage id="homeheader.searchdoctor" />
                                    </div>
                                </div>
                                <div className="child-content">
                                    <div>
                                        <b>
                                            <FormattedMessage id="homeheader.health-facility" />
                                        </b>
                                    </div>
                                    <div className="subs-title">
                                        <FormattedMessage id="homeheader.select-room" />
                                    </div>
                                </div>
                                <div className="child-content">
                                    <div>
                                        <b>
                                            <FormattedMessage id="homeheader.doctor" />
                                        </b>
                                    </div>
                                    <div className="subs-title">
                                        <FormattedMessage id="homeheader.select-doctor" />
                                    </div>
                                </div>
                                <div className="child-content">
                                    <div>
                                        <b>
                                            <FormattedMessage id="homeheader.fee" />
                                        </b>
                                    </div>
                                    <div className="subs-title">
                                        <FormattedMessage id="homeheader.check-health" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div style={{ width: "50%" }}></div>
                        )}

                        <div
                            className="right-content"
                            style={{
                                color: this.props.isShowDetailHeader
                                    ? "#4e4d4d"
                                    : "black",
                            }}
                        >
                            <div className="support">
                                <i className="fas fa-question-circle">
                                    <FormattedMessage id="homeheader.support" />
                                </i>
                            </div>
                            <div
                                className={
                                    language === LANGUAGES.VI
                                        ? "language-vi active"
                                        : "language-vi"
                                }
                            >
                                <span
                                    onClick={() =>
                                        this.changeLanguage(LANGUAGES.VI)
                                    }
                                >
                                    VN
                                </span>
                            </div>
                            <div
                                className={
                                    language === LANGUAGES.EN
                                        ? "language-en active"
                                        : "language-en"
                                }
                            >
                                <span
                                    onClick={() =>
                                        this.changeLanguage(LANGUAGES.EN)
                                    }
                                >
                                    EN
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true && (
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1">
                                <FormattedMessage id="banner.title1" />
                            </div>
                            <div className="title2">
                                <FormattedMessage id="banner.title2" />
                            </div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input
                                    type="text"
                                    placeholder="Tìm chuyên khoa khám bệnh"
                                />
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="option-child">
                                    <div className="icon-child">
                                        <FontAwesomeIcon
                                            className="ii"
                                            icon={faHospital}
                                        />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child1" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <FontAwesomeIcon
                                            className="ii"
                                            icon={faMobileButton}
                                        />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child2" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <FontAwesomeIcon
                                            className="ii"
                                            icon={faBookMedical}
                                        />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child3" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <FontAwesomeIcon
                                            className="ii"
                                            icon={faMicroscope}
                                        />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child4" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <FontAwesomeIcon
                                            className="ii"
                                            icon={faBrain}
                                        />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child5" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <FontAwesomeIcon
                                            className="ii"
                                            icon={faTooth}
                                        />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child6" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <FontAwesomeIcon
                                            className="ii"
                                            icon={faBedPulse}
                                        />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child7" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <FontAwesomeIcon
                                            className="ii"
                                            icon={faTruckMedical}
                                        />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child8" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <FontAwesomeIcon
                                            className="ii"
                                            icon={faQuestion}
                                        />
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child9" />
                                    </div>
                                </div>
                                {/* <div>
                                <FontAwesomeIcon
                                    className="ii"
                                    icon="fa-solid fa-coffee"
                                    size="6x"
                                />
                            </div> */}
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) =>
            dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
