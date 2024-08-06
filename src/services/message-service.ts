import axios from "axios";
import { IMessage } from "../@Types/productType";


const messageUrl = "https://projectnode-nzy2.onrender.com/api/v1/messages";

export const sendMessage = (data: IMessage) => {
    const url = `${messageUrl}/send-message`
    return axios.post(url, data);
}
export const getAllMessages = async () => {
    try {
        const response = await axios.get(`${messageUrl}/all-messages/get`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch messages');
    }
};
