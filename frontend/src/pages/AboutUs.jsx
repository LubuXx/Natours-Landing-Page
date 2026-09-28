import React, { useEffect} from 'react';

function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="main about-us">
      <div className="about-us__header">
        <h1 className="heading-secondary about-us__title">
          About Natours
        </h1>
        <p className="about-us__subtitle">
          Discover the world, one adventure at a time.
        </p>
      </div>

      <div className="about-us__content">
        <section className="about-us__section">
          <h2 className="heading-secondary ma-bt-md">
            Who We Are
          </h2>
          <p className='ma-bt-md'>
            At Natours, we believe that traveling is more than just visiting new places. It is about 
            discovering different cultures, experiencing unforgettable moments, and creating memories 
            that last a lifetime.
          </p>
          <p className='ma-bt-md'>
            We are a team of passionate travelers, experienced guides, and adventure enthusiasts dedicated 
            to providing unique and meaningful travel experiences around the world.
          </p>
          <p className='ma-bt-md'>
            From breathtaking mountain landscapes to hidden coastal destinations, we design tours that bring 
            people closer to nature and help them explore the world beyond the ordinary.
          </p>
        </section>

        <section className="about-us__section">
          <h2 className="heading-secondary ma-bt-md">
            Our Mission
          </h2>
          <p className='ma-bt-md'>
            Our mission is to make extraordinary travel experiences accessible to everyone while promoting 
            responsible tourism and respect for the natural environment.
          </p>
          <p className='ma-bt-md'>
            We aim to create journeys that combine adventure, comfort, safety, and authentic local experiences.
          </p>
        </section>

        <section className="about-us__section">
          <h2 className="heading-secondary ma-bt-md">
            Our Vision
          </h2>
          <p className='ma-bt-md'>
            We aspire to become a trusted name in adventure tourism, inspiring people to explore new destinations, 
            challenge themselves, and develop a deeper appreciation for the world around them.
          </p>
        </section>

        <section className="about-us__section">
          <h2 className="heading-secondary ma-bt-md">
            Why Travel With Us?
          </h2>

          <ul className="about-us__list">
            <li>
              <span className="about-us__number">01</span>
              <div>
                <h3>Experienced Guides</h3>
                <p>
                  Our professional guides bring local knowledge, experience, and passion to every journey.
                </p>
              </div>
            </li>

            <li>
              <span className="about-us__number">02</span>
              <div>
                <h3>Carefully Designed Tours</h3>
                <p>
                  Every tour is planned to provide a balance of adventure, comfort, and memorable experiences.
                </p>
              </div>
            </li>

            <li>
              <span className="about-us__number">03</span>
              <div>
                <h3>Small Group Experiences</h3>
                <p>
                  We focus on meaningful experiences and personal attention.
                </p>
              </div>
            </li>

            <li>
              <span className="about-us__number">04</span>
              <div>
                <h3>Responsible Tourism</h3>
                <p>
                  We encourage environmentally conscious travel and respect for local communities.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <section className="about-us__promise">
          <h2 className="heading-secondary ma-bt-md">
            Our Promise
          </h2>
          <p className='ma-bt-md'>
            Every journey should tell a story.
          </p>
          <p className='ma-bt-md'>
            Whether you are hiking through a national park, exploring a remote village, or discovering a 
            new culture, we are here to make your experience safe, enjoyable, and unforgettable.
          </p>
          <p className='ma-bt-md'><i>Natours — The world is waiting. Let's explore it together.</i></p>
        </section>
      </div>
    </main>
  );
}

export default AboutUs;