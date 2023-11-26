import actionTypes from "./actionTypes";
import {
    getAllCodeService,
    createNewUserByReact,
    getAllUsers,
    deleteUserByReact,
    editUserByReact,
    getTopControllerHomeService,
    getAllDoctors,
    saveDetailDoctorService,
} from "../../services/userService";
import { toast } from "react-toastify";
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START,
            });
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log("fetchGenderStart error", e);
        }
    };
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_POSITION_START,
            });
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log("fetchPositionStart error", e);
        }
    };
};
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ROLE_START,
            });
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log("fetchRoleStart error", e);
        }
    };
};

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserByReact(data);
            if (res && res.errCode !== 0) {
                alert(res.errMessage);
                dispatch(saveUserFailed());
            }
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed!");
                dispatch(saveUserSuccess(res.data));
                dispatch(fetchAllUsersStart());
            }
        } catch (e) {
            toast.error("Create new user failed!");
            dispatch(saveUserFailed());
            console.log("saveUserStart error", e);
        }
    };
};

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            // dispatch({
            //     type: actionTypes.FETCH_ROLE_START,
            // });
            // dispatch({
            //     type: actionTypes.FETCH_POSITION_START,
            // });
            // dispatch({
            //     type: actionTypes.FETCH_GENDER_START,
            // });
            let res = await getAllUsers("ALL");
            // let res1 = await getTopControllerHomeService(3);
            // console.log("check top doctor home:", res1);
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                toast.error("Fetch all users error!");
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("Fetch all users error!");
            dispatch(fetchAllUsersFailed());
            console.log("fetchAllUsersStart error", e);
        }
    };
};

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data,
    users: data,
});

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserByReact(userId);

            if (res && res.errCode === 0) {
                toast.success("Delete the user succeed!");
                dispatch(deleteUserSuccess(res.data));
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("Delete the user failed!");
            dispatch(deleteUserFailed());
            console.log("deleteUserFailed error", e);
        }
    };
};

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});

export const editAUser = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserByReact(user);

            if (res && res.errCode === 0) {
                toast.success("Update the user succeed!");
                dispatch(editUserSuccess(res.data));
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Update the user failed!");
            dispatch(editUserFailed());
            console.log("editUserFailed error", e);
        }
    };
};
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopControllerHomeService(5);

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                });
            }
        } catch (e) {
            console.log("FETCH_TOP_DOCTORS_FAILED: ", e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            });
        }
    };
};

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                });
            }
        } catch (e) {
            console.log("FETCH_ALL_DOCTORS_FAILED: ", e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            });
        }
    };
};

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);

            if (res && res.errCode === 0) {
                toast.success("Save detail information doctor succeed!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                });
            } else {
                toast.error("Save detail information doctor failed!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                });
            }
        } catch (e) {
            console.log("SAVE_DETAIL_DOCTOR_FAILED: ", e);
            toast.error("Save detail information doctor failed!");
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            });
        }
    };
};

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                });
            }
        } catch (e) {
            console.log("FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ", e);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            });
        }
    };
};

export const getRequiredDoctorInforStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START,
            });
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resPayment &&
                resPayment.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                };
                dispatch(fetchRequiredDoctorInforSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log("fetchRequiredDoctorInforStart error", e);
        }
    };
};

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData,
});

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});
