



const saveCustomerInfo=(firstname,lastname,contact,street,brgy,city)=>({
	typ: "CUSTOMER_INFO",
	firstname,
	lastname,
	contact,
	street,
	brgy,
	city
});