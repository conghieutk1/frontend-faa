import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils/constant";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        };
    }
    handleChangeLangauge = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    componentDidMount() {
        //let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        let { userInfo } = this.props;
        //let userInfo = Cookies.get("userInfo");
        let menu = [];
        //console.log("check userInfo = ", this.props);
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            } else if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        } else {
            menu = adminMenu;
        }
        this.setState({
            menuApp: menu,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            });
        }
        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
        //     this.setState({
        //         listDoctors: dataSelect,
        //     });
        // }
        // Kiểm tra nếu userInfo đã thay đổi từ props trước đó
    }
    render() {
        const { processLogout, language, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className="languages">
                    <span className="welcome">
                        <FormattedMessage id="homeheader.welcome" />
                        {userInfo && userInfo.firstName
                            ? userInfo.firstName
                            : ""}
                    </span>
                    <span
                        className={
                            language === LANGUAGES.VI
                                ? "language-vi active"
                                : "language-vi"
                        }
                        onClick={() => this.handleChangeLangauge(LANGUAGES.VI)}
                    >
                        VN
                    </span>
                    <span
                        className={
                            language === LANGUAGES.EN
                                ? "language-en active"
                                : "language-en"
                        }
                        onClick={() => this.handleChangeLangauge(LANGUAGES.EN)}
                    >
                        EN
                    </span>
                    {/* nút logout */}
                    <div
                        className="btn btn-logout"
                        onClick={processLogout}
                        title="Log out"
                    >
                        <i className="fas fa-sign-out-alt"></i>
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
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) =>
            dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
