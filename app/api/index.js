var API_URL = 'http://192.168.30.2:3000/v1';
exports.SIGNUP_URL = `${API_URL}/signup`;
exports.SIGNIN_URL = `${API_URL}/signin`;
exports.CUSTOMER_SIGNIN_URL = `${API_URL}/customersignin`;
exports.CUSTOMER_SIGNUP_URL = `${API_URL}/customersignup`;

exports.POPULATE_SERVICES = `${API_URL}/services`;
exports.POPULATE_STAFF = `${API_URL}/staffBulk`;
exports.AVAIL_SERVICE = `${API_URL}/availservice`;
exports.CAN_AVAIL = `${API_URL}/alreadyhaveservice`;
exports.ADD_CUSTOMER_SERVICE = `${API_URL}/addcustomerservice`;
exports.UPDATE_CUSTOMER_SERVICE = `${API_URL}/updatecustomerservicestate`;
exports.ACTIVE_SERVICES = `${API_URL}/returnactivecustomerservices`;
