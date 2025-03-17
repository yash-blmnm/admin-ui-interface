import axios from "axios";

const API = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

export default async function fetchMembers() { 
    return await axios(`${API}?query=react`);
}