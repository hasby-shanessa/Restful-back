const express = require('express');

const userRoute = require('./user.route');
const adminRoute = require('./admin.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/admin',
        route: adminRoute
    },

    {
        path: '/users',
        route: userRoute
    },

    {
        path: '/docs',
        route: require('./docs.route')
    }
];


defaultRoutes.forEach(route => {
    router.use(route.path, route.route);
});

module.exports = router;