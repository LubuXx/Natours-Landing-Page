import React, { useState, useEffect } from 'react';
import { getTours } from '../services/tourService';
import { Link } from 'react-router-dom';
import CircularIndeterminate from './Loading';

export default function Overview() {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await getTours();
                setTours(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, []);

    if (loading) return <div className='loading-overlay'>{CircularIndeterminate()}</div>;
    if (error) return <p>{error}</p>;

    return (
        <div className='main'>
            <div className='card-container'>
                {tours.map((tour) => (
                    <div key={tour._id} className='card'>
                        <div className='card__header'>
                            <div className='card__picture'>
                                <div className='card__picture-overlay'>&nbsp;</div>
                                <img className='card__picture-img' src={`/img/tours/${tour.imageCover}`} alt={`${tour.name}`} />
                            </div>
                            <h3 className='heading-tertirary'>
                                <span >{tour.name}</span>
                            </h3>
                        </div>
                        <div className='card__details'>
                            <h4 className='card__sub-heading'>{tour.difficulty} {tour.duration}-day tour</h4>
                            <p className='card__text'>{tour.summary}</p>
                            <div className='card__data'>
                                <svg className='card__icon'>
                                    <use xlinkHref='/img/icons.svg#icon-map-pin' />
                                </svg>
                                <span>{tour.startLocation.description}</span>
                            </div>
                            <div className='card__data'>
                                <svg className='card__icon'>
                                    <use xlinkHref='/img/icons.svg#icon-calendar' />
                                </svg>
                                <span>
                                    {tour.startDates?.length
                                        ? new Date(tour.startDates[0]).toLocaleString('en-US', {
                                            month: 'long',
                                            year: 'numeric'
                                        })
                                        : 'No date available'}
                                </span>
                            </div>
                            <div className='card__data'>
                                <svg className='card__icon'>
                                    <use xlinkHref='/img/icons.svg#icon-flag' />
                                </svg>
                                <span>{tour.locations.length} stops</span>
                            </div>
                            <div className='card__data'>
                                <svg className='card__icon'>
                                    <use xlinkHref='/img/icons.svg#icon-user' />
                                </svg>
                                <span>{tour.maxGroupSize} people</span>
                            </div>
                        </div>
                        <div className='card__footer'>
                            <p>
                                <span className='card__footer-value'>${tour.price}</span>
                                <span className='card__footer-text'> per person</span>
                            </p>
                            <p className='card__ratings'>
                                <span className='card__footer-value'>{tour.ratingsAverage}</span>
                                <span className='card__footer-text'> {`rating (${tour.ratingsQuantity})`}</span>
                            </p>
                            <Link className='btn btn--green btn--small' to={`/tours/${tour.slug}`}>Details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};