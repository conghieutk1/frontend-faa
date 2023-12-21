import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageEvents.scss';
import AssignLabel from './Modal/AssignLabel';
import ReactPaginate from 'react-paginate';
import { videoConnectionReceivedFrame } from '../../helper/vms';
class ManageEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalAssignLabel: false,
            currentPage: 0,
            itemsPerPage: 10, // Số mục muốn hiển thị trên mỗi trang
        };
    }
    handlePageClick = (data) => {
        this.setState({ currentPage: data.selected });
    };

    async componentDidMount() {}

    openModalAssignLabel = async () => {
        this.setState({
            isOpenModalAssignLabel: true,
        });
    };

    toggleModalAssignLabel = () => {
        this.setState({
            isOpenModalAssignLabel: !this.state.isOpenModalAssignLabel,
        });
    };
    assignLabel = () => {
        try {
            console.log('this is function assignLabel');
        } catch (e) {
            console.log(e);
        }
    };

    getImage = async () => {
        return new Promise(async (resolve, reject) => {
            const fakeFrame = {
                dataSize: 100, // Giả sử có dữ liệu
                hasSizeInformation: true,
                sizeInfo: {
                    destinationSize: {
                        resampling: 2,
                        width: 200,
                        height: 150,
                    },
                },
                blob: new Blob(['fakeImageData'], { type: 'image/jpeg' }),
                timestamp: new Date(),
            };
            try {
                let image = await videoConnectionReceivedFrame((fakeFrame1) => {
                    console.log('fakeFrame ', fakeFrame1);
                });
                console.log('image ', image);
                resolve(image);
            } catch (error) {
                console.log(error);
                reject();
            }
        });
    };

    render() {
        // console.log("check state user ", this.state);
        // console.log("id ", this.state.arrUsers);
        const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        const { currentPage, itemsPerPage } = this.state;
        const pageCount = Math.ceil(items.length / itemsPerPage);
        const displayedItems = items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
        return (
            <>
                <AssignLabel
                    isOpen={this.state.isOpenModalAssignLabel}
                    toggleFromParent={this.toggleModalAssignLabel}
                    handleAssignLabelFromParent={this.assignLabel}
                />
                <div className="title">Manage Events</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3 connectVMS" onClick={() => this.openModalAssignLabel()}>
                        <i className="fas fa-plus px-2"></i>
                        Assign label for objects
                    </button>
                    <button className="btn btn-primary px-3 connectVMS" onClick={() => this.getImage()}>
                        <i className="fas fa-plus px-2"></i>
                        Get image
                    </button>
                </div>

                <div className="modal-connect-vms-table">
                    <table id="TableManageCameraToAdd">
                        <tbody>
                            <tr>
                                <th>STT</th>
                            </tr>
                            {displayedItems.map((item, index) => (
                                <tr key={index}>
                                    <td>Item #{item}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageEvents);
