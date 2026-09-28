import React, { useEffect } from 'react';

function Careers() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="careers">
      {/* Hero Section */}
      <section className="careers__hero">
        <div className="careers__hero-content">
          <span className="careers__eyebrow">CAREERS AT NATOURS</span>

          <h1>
            Build Your Career
            <br />
            <span>With Natours</span>
          </h1>

          <p>
            Turn your passion for nature and adventure into a meaningful
            career. Join a team that creates unforgettable travel
            experiences and inspires people to explore the world.
          </p>

          <a href="#careers-join" className="careers__button">
            Join Our Team
          </a>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="careers__section">
        <div className="careers__section-heading">
          <span className="careers__eyebrow">LIFE AT NATOURS</span>
          <h2>Why Work With Us?</h2>
          <p>
            We believe that great experiences start with great people.
            Here's what makes being part of Natours special.
          </p>
        </div>

        <div className="careers__benefits">
          <article className="careers__card">
            <span className="careers__card-number">01</span>
            <h3>Meaningful Experiences</h3>
            <p>
              Help travelers discover new destinations, connect with
              nature, and create memories that last a lifetime.
            </p>
          </article>

          <article className="careers__card">
            <span className="careers__card-number">02</span>
            <h3>Growth & Development</h3>
            <p>
              Develop your skills, take on new challenges, and grow
              alongside a team that values continuous learning.
            </p>
          </article>

          <article className="careers__card">
            <span className="careers__card-number">03</span>
            <h3>A Passionate Team</h3>
            <p>
              Work with people who share your enthusiasm for travel,
              adventure, and delivering exceptional experiences.
            </p>
          </article>

          <article className="careers__card">
            <span className="careers__card-number">04</span>
            <h3>Explore the Outdoors</h3>
            <p>
              Be part of a company that celebrates the natural world
              and encourages exploration beyond the ordinary.
            </p>
          </article>
        </div>
      </section>

      {/* Who We Are Looking For */}
      <section className="careers__section careers__section--alt">
        <div className="careers__section-heading">
          <span className="careers__eyebrow">YOUR NEXT ADVENTURE</span>
          <h2>Who We Are Looking For</h2>
          <p>
            We're always interested in meeting people who bring
            enthusiasm, responsibility, and fresh ideas to our team.
          </p>
        </div>

        <div className="careers__roles">
          <div className="careers__role">
            <div>
              <h3>Tour Guides</h3>
              <p>
                Passionate explorers who enjoy leading groups and
                sharing their knowledge of nature and local culture.
              </p>
            </div>
            <span className="careers__role-tag">Outdoor</span>
          </div>

          <div className="careers__role">
            <div>
              <h3>Travel Coordinators</h3>
              <p>
                Organized individuals who can coordinate itineraries,
                schedules, and memorable travel experiences.
              </p>
            </div>
            <span className="careers__role-tag">Operations</span>
          </div>

          <div className="careers__role">
            <div>
              <h3>Customer Experience Specialists</h3>
              <p>
                Friendly communicators who enjoy helping travelers
                and providing excellent customer support.
              </p>
            </div>
            <span className="careers__role-tag">Customer Care</span>
          </div>

          <div className="careers__role">
            <div>
              <h3>Marketing & Content Creators</h3>
              <p>
                Creative thinkers who can tell our story and inspire
                people to discover new destinations.
              </p>
            </div>
            <span className="careers__role-tag">Creative</span>
          </div>

          <div className="careers__role">
            <div>
              <h3>Technology & Development</h3>
              <p>
                Innovative problem-solvers interested in improving
                our digital platforms and online travel experience.
              </p>
            </div>
            <span className="careers__role-tag">Technology</span>
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section
        className="careers__join"
        id="careers-join"
      >
        <div className="careers__join-content">
          <span className="careers__eyebrow">
            YOUR JOURNEY STARTS HERE
          </span>

          <h2>Join Our Team</h2>

          <p>
            Don't see a position that fits your experience?
            We'd still love to hear from you. Tell us a little
            about yourself and how you'd like to contribute
            to Natours.
          </p>

          <form
            className="careers__form"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="careers__form-group">
              <label htmlFor="career-name">
                Full Name
              </label>
              <input
                type="text"
                id="career-name"
                name="name"
                placeholder="Your full name"
                required
              />
            </div>

            <div className="careers__form-group">
              <label htmlFor="career-email">
                Email Address
              </label>
              <input
                type="email"
                id="career-email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="careers__form-group">
              <label htmlFor="career-position">
                Position of Interest
              </label>
              <select
                id="career-position"
                name="position"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select a position
                </option>
                <option value="tour-guide">
                  Tour Guide
                </option>
                <option value="travel-coordinator">
                  Travel Coordinator
                </option>
                <option value="customer-experience">
                  Customer Experience
                </option>
                <option value="marketing">
                  Marketing & Content
                </option>
                <option value="technology">
                  Technology & Development
                </option>
                <option value="other">
                  Other
                </option>
              </select>
            </div>

            <div className="careers__form-group">
              <label htmlFor="career-message">
                Tell Us About Yourself
              </label>
              <textarea
                id="career-message"
                name="message"
                rows="5"
                placeholder="Share your experience, skills, and why you'd like to join Natours..."
                required
              />
            </div>

            <button
              type="submit"
              className="careers__button careers__button--submit"
            >
              Send Application
            </button>
          </form>

          <p className="careers__contact">
            Have questions? Contact us at{' '}
            <a href="mailto:careers@natours.com">
              careers@natours.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Careers;