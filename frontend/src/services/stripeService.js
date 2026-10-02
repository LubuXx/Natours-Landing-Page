import { getCheckoutSession } from "./bookingService";
import ShowAlert from '../components/Alert';

export const bookTour = async tourId => {
    try {
        const data = await getCheckoutSession(tourId);
        window.location.href = data.session.url;
    } catch (err) {
        ShowAlert('error', err);
    };
};