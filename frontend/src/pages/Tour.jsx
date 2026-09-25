import 'leaflet/dist/leaflet.css';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getTour } from '../services/tourService';
import { displayMap } from '../hooks/useMapbox';
import ReviewCard from '../components/ReviewCard';
import CircularIndeterminate from '../components/Loading';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function OverviewBox({ label, text, icon }) {
    return(
        <div className='overview-box__detail'>
            <svg className='overview-box__icon'>
                <use href={`/img/icons.svg#icon-${icon}`} />
            </svg>
            <span className='overview-box__label'>{label}</span>
            <span className='overview-box__text'>{text}</span>
        </div>
    );
};

function Tour() {
    const { id } = useParams();

    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const mapRef = useRef(null);

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const response = await getTour(id);
                setTour(response.data.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Tour could not be loaded!');
            } finally {
                setLoading(false);
            };
        };

        fetchTour();
    }, [id]);

    useEffect(() => {
        if (!tour || !mapRef.current || !tour.locations?.length) return;

        const map = displayMap(mapRef.current, tour.locations);
        return () => {
            map?.remove();
        };
    }, [tour]);

    if (loading) return <div className='loading-overlay'>{CircularIndeterminate()}</div>;
    if (error) return <p>{error}</p>;
    if (!tour) return <p>Tour not found!</p>;

    const nextDate = tour.startDates?.[0] ? new Date(tour.startDates[0]).toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
    }) : 'No date available';

    const paragraphs = tour.description?.split('\n') || [];

    return (
        <main>
            <section className='section-header'>
                <div className='header__hero'>
                    <div className='header__hero-overlay'>&nbsp;</div>
                    <img className='header__hero-img' src={`${BACKEND_URL}/img/tours/${tour.imageCover}`} />
                </div>
                <div className='heading-box'>
                    <h1 className='heading-primary'>
                        <span>{tour.name}</span>
                    </h1>
                    <div className='heading-box__group'>
                        <div className='heading-box__detail'>
                            <svg className='heading-box__icon'>
                                <use href='/img/icons.svg#icon-clock'></use>
                            </svg>
                            <span className='heading-box__text'>
                                {tour.duration} days
                            </span>
                        </div>
                        <div className='heading-box__detail'>
                            <svg className='heading-box__icon'>
                                <use href='/img/icons.svg#icon-map-pin'></use>
                            </svg>
                            <span className='heading-box__text'>
                                {tour.startLocation?.description}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='section-description'>
                <div className='overview-box'>
                    <div>
                        <div className='overview-box__group'>
                            <h2 className='heading-secondary ma-bt-lg'>
                                Quick facts
                            </h2>
                            <OverviewBox label='Next date' text={nextDate} icon='calendar' />
                            <OverviewBox label='Participants' text={`${tour.maxGroupSize} people`} icon='user' />
                            <OverviewBox label='Rating' text={`${tour.ratingsAverage} / 5`} icon='star' />
                        </div>
                        <div className='overview-box__group'>
                            <h2 className='heading-secondary ma-bt-lg'>
                                Your tour guides
                            </h2>
                            {
                                tour.guides.map((guide, index) => (
                                    <div key={index} className='overview-box__detail'>
                                        <img className='overview-box__img' src={`${BACKEND_URL}/img/users/${guide.photo}`} alt={`${guide.name}`} />
                                        <span className='overview-box__label'>
                                            {guide.role === 'lead-guide' ? 'Lead Guide' : 'Tour Guide'}
                                        </span>
                                        <span className='overview-box__text'>
                                            {guide.name}
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='description-box'>
                    <h2 className='heading-secondary ma-bt-lg'>
                        About {tour.name} tour
                    </h2>
                    {
                        paragraphs.map((paragraph, index) => (
                            <p className='description__text' key={index}>
                                {paragraph}
                            </p>
                        ))
                    }
                </div>
            </section>

            <section className='section-pictures'>
                {
                    tour.images?.map((image, index) => (
                        <div className='picture-box' key={index}>
                            <img className={`picture-box__img picture-box__img--${index + 1}`} src={`${BACKEND_URL}/img/tours/${image}`} alt={`${tour.name} tour ${index + 1}`} />
                        </div>
                    ))
                }
            </section>

            {/* After the review modelling it's and test docs, update this section as a location at real time gps*/}
            <section className='section-map'>
                <div id='map' ref={mapRef}>
                </div>
            </section>

            <section className='section-reviews'>
                <div className='reviews'>
                {
                    tour.reviews?.map((review) => (
                        <ReviewCard
                            key={review._id}
                            review={review}
                        />
                    ))
                }
                </div>
            </section>

            <section className='section-cta'>
                <div className='cta'>
                    <div className='cta__img cta__img--logo'>
                        <img src='/img/logo-white.png' alt='Natours logo' />
                    </div>
                    {tour.images?.[1] && (<img className='cta__img cta__img--1' src={`${BACKEND_URL}/img/tours/${tour.images[1]}`} />)}
                    {tour.images?.[2] && (<img className='cta__img cta__img--2' src={`${BACKEND_URL}/img/tours/${tour.images[2]}`} />)}
                    <div className='cta__content'>
                        <h2 className='heading-secondary'>
                            What are you waiting for?
                        </h2>
                        <p className='cta__text'>
                            {tour.duration} days. 1 adventure. Infinite memories. Make it yours today!
                        </p>
                        <button className='btn btn--green span-all-rows'>Book tour now!</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Tour;