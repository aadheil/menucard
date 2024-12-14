import { commonAPI } from "./commonApi";

 export const getMenuList = async(headers) => {
    return await commonAPI("GET",`/api/v1/menus?restaurantId=REST-a4127b25-cb33-4969-aa88-128509849405&restaurantName=aryas`,"",headers)
 }
 
 export const getRestaurantList = async(headers) => {
   return await commonAPI("GET",`/api/v1/restaurants`,"",headers)
}

 export const addMenus = async(body,headers) => {
   return await commonAPI("POST",`/api/v1/menus`,body,headers)
}

export const addRestaurants = async(body,headers) => {
   return await commonAPI("POST",`/api/v1/restaurants`,body,headers)
}

export const updateMenuItem = async(body,headers )=> {
   return await commonAPI("PATCH",`/api/v1/menus`,body,headers)
}

export const updateRestaurants = async(body,headers )=> {
   return await commonAPI("PATCH",`/api/v1/restaurants`,body,headers)
}
