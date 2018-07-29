import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	name: {type: String},
	fullAddress: {type: String},
	street: {type: String},
	brgy: {type: String},
	lat: {type: String},
	long: {type: String},
});
export var User = mongoose.model('user',userSchema);