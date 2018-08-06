var API_URL = 'http://192.168.30.3:3000/v1';

//CUSTOMER
exports.CUST_IN = `${API_URL}/customersignin`;
exports.CUST_UP = `${API_URL}/customersignup`;
exports.ACTIVE_SERVICES = `${API_URL}/returnactivecustomerservices`;
exports.CAN_AVAIL = `${API_URL}/alreadyhaveservice`;
exports.AVAIL_SERVICE = `${API_URL}/availservice`;
exports.ADD_CUSTOMER_SERVICE = `${API_URL}/addcustomerservice`;
exports.UPDATE_CUSTOMER_SERVICE = `${API_URL}/updatecustomerservicestate`;
exports.UPDATE_CUSTOMER_INFO = `${API_URL}/updatecustomerinfo`;


//STAFF
exports.SIGNUP_URL = `${API_URL}/signup`;
exports.SIGNIN_URL = `${API_URL}/signin`;


//POPS
exports.POP_SERVICES = `${API_URL}/services`;
exports.POP_STAFF = `${API_URL}/staffBulk`;