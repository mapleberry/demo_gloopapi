'use strict';

function UserNotFound(message) {
    this.name = 'UserNotFound';
    this.message = message || 'User not found.';
}

UserNotFound.prototype = Object.create(Error.prototype);
UserNotFound.prototype.constructor = UserNotFound;

module.exports = {
    UserNotFound
}
