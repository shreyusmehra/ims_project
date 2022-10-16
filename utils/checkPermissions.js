const { UnauthenticatedError } = require("../errors/index");

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new UnauthenticatedError("Not authorized to access this route");
};

module.exports = checkPermissions;
