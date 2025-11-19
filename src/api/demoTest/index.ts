import APIClient from "../api";


export const getAllCategory = (daxue:string) => {
	return APIClient.get({url:`/api/query/daxue`,params:{daxue}});
};
