import APIClient from "../api";


export const getAllCategory = (daxue?:string) => {
	return APIClient.get({url:`/query/daxue`,params:{daxue}});
};
