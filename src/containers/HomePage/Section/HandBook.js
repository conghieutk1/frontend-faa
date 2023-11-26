import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
class HandBook extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div className="section-share section-handbook">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.handbook" />
                        </span>
                        <button className="button-section">
                            <FormattedMessage id="homepage.allposts" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...settings}>
                            <div className="section-customize">
                                <div className="bg-img1"></div>
                                <div className="text-img">
                                    <div>
                                        Bác sĩ Chuyên khoa II Nguyễn Minh A
                                    </div>
                                    <div>Sức khỏe tâm thần - Tư vấn</div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img2"></div>
                                <div className="text-img">
                                    <div>Phó Giáo sư, Tiến sĩ Nguyễn Duy B</div>
                                    <div>Da liễu</div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img3"></div>
                                <div className="text-img">
                                    <div>Tiến sĩ Bác sĩ Bùi Thị Phương C</div>
                                    <div>Sản phụ khoa</div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img4"></div>
                                <div className="text-img">
                                    <div>Giáo sư Tiến sĩ Hà Văn D</div>
                                    <div>Tiêu hóa - Bệnh viêm gan</div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img5"></div>
                                <div className="text-img">
                                    <div>Giáo sư Tiến sĩ Nguyễn Văn E</div>
                                    <div>Thần kinh</div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img6"></div>
                                <div className="text-img">
                                    <div>Tiến sĩ, Bác sĩ Nguyễn Thành A</div>
                                    <div>Tai - Mũi - Họng</div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img7"></div>
                                <div className="text-img">
                                    <div>Giáo sư Tiến sĩ Nguyễn Văn B</div>
                                    <div>Cơ xương khớp</div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-img8"></div>
                                <div className="text-img">
                                    <div>Bác sỹ Nguyễn Văn C</div>
                                    <div>Nội khoa</div>
                                </div>
                            </div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
