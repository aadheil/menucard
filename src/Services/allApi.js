import { commonAPI } from "./commonApi";
import { BASEURL } from "./baseUrl";

 export const GetProductList = async(headers)=>{
    return await commonAPI("GET",`/api/v1/menus`,"",headers)
 }
 export const AddProduct = async(body,headers)=>{
   return await commonAPI("POST",`/api/v1/menus`,body,headers)
}