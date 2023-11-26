import React, { Component } from "react";
import { connect } from "react-redux";

class HomeFooter extends Component {
    render() {
        return (
            <div className="home-footer">
                <p>
                    &copy; 2023 Đặng Hữu Công Hiếu.{" "}
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href="https://www.facebook.com/conghieu1209.tk1"
                    >
                        More Information!
                    </a>
                </p>
            </div>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
