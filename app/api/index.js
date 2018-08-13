var API_URL = 'http://192.168.30.3:3000/v1';
//var API_URL = 'https://boiling-journey-93382.herokuapp.com/v1';
var GEO_URL = 'http://maps.googleapis.com/maps/api/geocode/json?';

//CUSTOMER
exports.CUST_IN = `${API_URL}/customersignin`;
exports.CUST_UP = `${API_URL}/customersignup`;
exports.ACTIVE_SERVICES = `${API_URL}/returnactivecustomerservices`;
exports.CAN_AVAIL = `${API_URL}/alreadyhaveservice`;
exports.AVAIL_SERVICE = `${API_URL}/availservice`;
exports.ADD_CUSTOMER_SERVICE = `${API_URL}/addcustomerservice`;
exports.UPDATE_CUSTOMER_SERVICE = `${API_URL}/updatecustomerservicestate`;
exports.UPDATE_CUSTOMER_INFO = `${API_URL}/updatecustomerinfo`;
exports.UPDATE_CUSTOMER_ADDRESS = `${API_URL}/updatecustomeraddress`;
exports.COUNT_ACTIVE = `${API_URL}/countactive`;
exports.POSITION_ACTIVE = `${API_URL}/positionactive`;
exports.CUST_QUEUE = `${API_URL}/customerqueue`;
exports.FIND_ADDR_EXIST = `${API_URL}/findaddressexist`;


//STAFF
exports.SIGNUP_URL = `${API_URL}/signup`;
exports.SIGNIN_URL = `${API_URL}/signin`;
exports.ADD_SERVICE = `${API_URL}/addservices`;
exports.UPDATE_SERVICE = `${API_URL}/updateservices`;
exports.GET_APPOINTMENT = `${API_URL}/getappointment`;
exports.GET_STAFF_TRANSACTION = `${API_URL}/getstafftransaction`;
exports.GET_STAFF_PROFILE = `${API_URL}/retrievestaffprofile`;
exports.UPDATE_STAFF_PROFILE = `${API_URL}/updatestaffprofile`;
exports.LOGIN_ADMIN = `${API_URL}/loginadmin`;



//POPS
exports.POP_SERVICES = `${API_URL}/services`;
exports.POP_STAFF = `${API_URL}/staffBulk`;
exports.POP_CUST = `${API_URL}/customerBulk`;
exports.POP_REC = `${API_URL}/getrecords`;

// dels

exports.DEL_STAFF = `${API_URL}/deletebyid`;
exports.DEL_CUST = `${API_URL}/deletebycustomerid`;
exports.DEL_SERVICE = `${API_URL}/deleteservices`;
exports.DEL_AVAIL = `${API_URL}/deleteactiveavail`;



// GPS

exports.GEO_SUPPORT = GEO_URL;

