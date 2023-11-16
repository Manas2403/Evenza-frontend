import axios from "axios";
import { useState, useEffect } from "react";
const API_URL = "http://192.168.29.157:8080";
export const getAllEvents = async () => {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
};
export const registerUser = async (data) => {
    const response = await axios.post(`${API_URL}/user/register`, data);
    return response.data;
}
export const loginUser = async (data) => {
    const response = await axios.post(`${API_URL}/user/login`, data);
    return response.data;
}

export const getUserId= async (token) => {
    const response = await axios.get(`${API_URL}/user`,{headers: {
        'Authorization': `Bearer ${token}` 
      }});
    return response.data;
}
export const getUserDetails = async(id)=>{
    const response = await axios.get(`${API_URL}/user/${id}`);
    return response.data;
}
export const createEvent = async (formData) => {
   const response = await axios.post(
     `${API_URL}/events/new`,
     formData,
     {
       headers: {
         "Content-Type": "multipart/form-data",
       },
     }
   );
    return response.data;
}
export const createSubEvent = async (formData) => {
    const response = await axios.post(
      `${API_URL}/activity/new`,
      formData      
    );
     return response.data;
 }
