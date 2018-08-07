import axios from 'axios';
import {CancelToken} from 'axios';
let testSite = "https://www.google.com";
let testServer = "http://192.168.30.3:3000/v1/services";
export const testConnection = () =>{
	return function(dispatch){
		let source = CancelToken.source();
		setTimeout(()=> {
			source.cancel();
			},5000);
		return axios.get(testSite,{cancelToken: source.token}).then((response)=>{
			console.warn("There is internet");
			dispatch({
				type: "IS_CONNECTED",
				isConnectedYet: true,
				isDisplayable: true,
			});

			
		})
		// .then(()=>{
		// 	return axios.get(testServer).then((response)=>{
		// 	dispatch({
		// 		type: "IS_SERVER",
		// 		isServer: true,
		// 		isDisplayable: true
		// 	});
		// }).catch((error)=>{
		// 	console.warn("ERROR SERVER",error);
		// 	dispatch({
		// 		type: "IS_SERVER",
		// 		isServer: false,
		// 		isDisplayable: true
		// 	});

		// });

		.catch((error)=>{
			console.warn("No Internet I guess",error.response.status,error,error.response);
			dispatch({
				type: "IS_CONNECTED",
				isConnectedYet: false,
				isDisplayable: true,
			});
			
		})
	}
}


export const testServerConnection=()=>{
	console.warn("STARTED SERVER TESTING");
	return async function(dispatch){
		let source = CancelToken.source();
		setTimeout(()=> {
			source.cancel();
			},1000);
		return axios.post(testServer,{},{cancelToken: source.token}).then((response)=>{
			dispatch({
				type: "SERVER_CONNECTED",
				serverconnection: true,
				offlineDisplay: true
			});
		}).catch((error)=>{
			console.warn("ERROR SERVER",error);
			dispatch({
				type: "SERVER_CONNECTED",
				serverconnection: false,
				offlineDisplay: true
			});
		});
	console.warn("ENDED SERVER TESTING");
	}
}

export const isConnectedChange=(isConnectedYet,isDisplayable)=>({
	type: "IS_CONNECTED",
	isConnectedYet,
	isDisplayable
})