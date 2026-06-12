const routes = {
    home: {
        path: "/",
        requiresAuth: false,
    },
    dashboard: {
        path: "/dashboard",
        requiresAuth: true,
    },
};
export {};
// console.log(routes.home);
