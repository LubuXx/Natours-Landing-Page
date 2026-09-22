import axios from "axios";
import ShowAlert from "../components/Alert";

export const useUpdateSettings = async (data, type) => {
    try {
        const url = type === 'password' ? `${import.meta.env.VITE_API_URL}/updateMyPassword` : `${import.meta.env.VITE_API_URL}/updateMe`;
        const res = await axios({
            method: 'PATCH',
            url,
            data
        });

        if (res.data.status === 'success') {
            ShowAlert('success', `${type.toUpperCase()} updated successfully!`);
        };

    } catch (err) {
        ShowAlert('error', err.response.data.message);
    }
};