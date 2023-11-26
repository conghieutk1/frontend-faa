import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctocs: [],
    allDoctors: [],
    allScheduleTime: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            //let copyState = { ...state };
            state.isLoadingGender = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            //copyState = { ...state };
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_FAILED:
            //copyState = { ...state };
            state.genders = [];
            state.isLoadingGender = false;
            return {
                ...state,
            };

        case actionTypes.FETCH_POSITION_START:
            state.isLoadingPosition = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            //copyState = { ...state };
            state.positions = action.data;
            state.isLoadingPosition = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_FAILED:
            //copyState = { ...state };
            state.positions = [];
            state.isLoadingPosition = false;
            return {
                ...state,
            };

        case actionTypes.FETCH_ROLE_START:
            state.isLoadingRole = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            //copyState = { ...state };
            state.roles = action.data;
            state.isLoadingRole = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_FAILED:
            //copyState = { ...state };
            state.roles = [];
            state.isLoadingRole = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,
            };

        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.dataDoctors = action.dataDoctors;
            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.dataDoctors = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];
            return {
                ...state,
            };

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state,
            };

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;
            //console.log("allRequiredDoctorInfor: ", action);
            return {
                ...state,
            };
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allRequiredDoctorInfor = [];
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default adminReducer;
