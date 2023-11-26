export const adminMenu = [
    {
        //Quản lý người dùng
        name: 'menu.admin.menu',
        menus: [
            {
                name: 'menu.admin.dashboard',
                link: '/system/dashboard',
            },
            {
                name: 'menu.admin.views',
                link: '/system/views',
            },
            {
                name: 'menu.admin.manage-events',
                link: '/system/manage-events',
            },
        ],
    },
];

export const doctorMenu = [
    {
        name: 'menu.admin.user',
        menus: [
            {
                //Quản lý kế hoạch khám bệnh của bác sỹ
                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule',
            },
            {
                //Quản lý lịch hẹn khám bệnh của bác sỹ
                name: 'menu.doctor.manage-booking',
                link: '/doctor/manage-booking',
            },
        ],
    },
];
