import axios from "axios";
import { useState, useEffect } from "react";
const API_URL = "http://192.168.111.223:8080";
export const getAllEvents = async () => {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
};
export const registerUser = async (data) => {
    const response = await axios.post(`${API_URL}/user/register`, data);
    return response.data;
};
export const loginUser = async (data) => {
    const response = await axios.post(`${API_URL}/user/login`, data);
    return response.data;
};
export const loginAdmin = async (data) => {
    const response = await axios.post(`${API_URL}/admin/login`, data);
    return response.data;
};

export const getUserDetails = async (userId) => {
    console.log(userId);
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
};

export const createEvent = async (formData) => {
    const response = await axios.post(`${API_URL}/events/new`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
export const createSubEvent = async (formData, email) => {
    const response = await axios.post(`${API_URL}/activity/new`, {
        formData,
        email: email,
    });
    return response.data;
};
export const getEvent = async (eventId) => {
    const response = await axios.get(`${API_URL}/events/${eventId}`);

    console.log(response.data);
    return response.data;
};
export const eventRegister = async (eventId, userId) => {
    const response = await axios.post(`${API_URL}/events/userreg`, {
        eventId,
        userId,
    });
    return response.data;
};
export const getApprovals = async (eventId) => {
    const response = await axios.get(`${API_URL}/events/requests/${eventId}`);
    return response.data;
};
export const approveRegisteration = async (eventId, userId, isApproved) => {
    const response = await axios.post(`${API_URL}/events/approve`, {
        eventId: eventId,
        userId: userId,
        newStatus: isApproved,
    });
    return response.data;
};
