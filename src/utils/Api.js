import axios from "axios";
import { useState, useEffect } from "react";
const API_URL = "https://evenza-backend.onrender.com";
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
export const loginAdmin = async (data) => {
    const response = await axios.post(`${API_URL}/admin/login`, data);
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