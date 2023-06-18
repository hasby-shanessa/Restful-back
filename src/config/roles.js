const allRoles = {
    admin: ['admin', 'manageUsers'],
    subscriber: ['subscriber'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
    roles,
    roleRights
};