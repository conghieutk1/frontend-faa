import axios from '../axios';

const handleLoginApi = (userAccount, userPassword) => {
    return axios.post('/api/login', {
        account: userAccount,
        password: userPassword,
    });
};

const getAllUsers = (userId) => {
    return axios.get(`/api/get-all-users?id=${userId}`);
};

const createNewUserByReact = (data) => {
    return axios.post('/api/create-new-user', data);
};

const deleteUserByReact = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId,
        },
    });
};

const editUserByReact = (data) => {
    return axios.put('/api/edit-user', data);
};
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
};
const getTopControllerHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctors', data);
};

const getDetailInforDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(
        `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
    );
};

const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postPatientBookingAppointment = (data) => {
    return axios.post(`/api/patient-booking-appointment`, data);
};

const postVerifyBookingAppointment = (data) => {
    return axios.post(`/api/verify-booking-appointment`, data);
};
const getListBookingAppointment = (data) => {
    return axios.get(`/api/get-list-booking-appointment?date=${data.date}`);
};
const postSendAppointment = (data) => {
    return axios.post(`/api/send-done-appointment`, data);
};
export {
    handleLoginApi,
    getAllUsers,
    createNewUserByReact,
    deleteUserByReact,
    editUserByReact,
    getAllCodeService,
    getTopControllerHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    postPatientBookingAppointment,
    postVerifyBookingAppointment,
    getListBookingAppointment,
    postSendAppointment,
};
