import { commonAPI } from "./commonApi";
import { BASEURL } from "./baseUrl";

 export const GetProductList = async(headers)=>{
    return await commonAPI("GET",`/api/v1/menus`,"",headers)
 }
