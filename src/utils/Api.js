import axios from "axios";
import { useState, useEffect } from "react";
const API_URL = "https://evenza-backend.onrender.com";
export const getAllEvents = async () => {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
};
