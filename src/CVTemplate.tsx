import React from 'react';
import './CVTemplate.css';
import { CVData } from './CVBuilder';

interface CVTemplateProps {
    cvData: CVData;
    handleDeleteItem: (section: keyof CVData, index: number) => void;
}

const CVTemplate: React.FC<CVTemplateProps> = ({ cvData, handleDeleteItem }) => {
  return (
    <div className="A4">
      <div className="sheet">
        <div className="two-column resume">
          {/* Resume Header */}
          <div className="resume__header">
            <section className="resume__section">
              <div className="resume__content">
                <div className="resume__header-content">
                  {cvData.photo && (
                      <div className="resume__photo">
                        <img src={cvData.photo} alt="Profile" />
                      </div>
                    )}
                  <div className="resume__details">
                    <h1>{cvData.name}</h1>
                    {cvData.email && (
                      <div className="info-item">
                        <span className="info-label">
                          <img src="/mail.png" alt="Mail" />
                        </span>
                        <span className="info-text">{cvData.email}</span>
                      </div>
                    )}
                    {cvData.phone && (
                      <div className="info-item">
                        <span className="info-label">
                          <img src="/phone.png" alt="Phone" />
                        </span>
                        <span className="info-text">{cvData.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Main and Side Columns */}
          <div className="resume__columns">
            {/* Main Column */}
            <div className="resume__main">
              {/* About Me */}
              {cvData.summary && (
                <section className="resume__section resume__summary">
                  <div className="resume__content">
                    <div className="resume__section-title">
                      <img src="/info.png" alt="Info" />
                      <h2>About Me</h2>
                    </div>
                    <div className="other">
                      <div className="other-info">
                        <p>{cvData.summary}</p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Employment History */}
              {cvData.workExperience.length > 0 && (
                <section className="resume__section resume__experience">
                  <div className="resume__content">
                    <div className="resume__section-title">
                      <img src="/work.png" alt="Work" />
                      <h2>Employment History</h2>
                    </div>
                    {cvData.workExperience.map((job, index) => (
                      <div key={index} className="xp-item">
                        <div className="xp-job">
                          {job.position} <span>@ {job.company}</span>
                          <br />
                          <small>{job.location}</small>
                        </div>
                        <div className="xp-date">
                          {job.startDate} – {job.endDate}
                        </div>
                        {job.description[0] && (
                          <div className="xp-detail">
                            <ul>
                              {job.description.map((desc, i) => (
                                <li key={i}>{desc}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteItem('workExperience', index)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {cvData.education.length > 0 && (
                <section className="resume__section resume__education">
                  <div className="resume__content">
                    <div className="resume__section-title">
                      <img src="/education.png" alt="Education" />
                      <h2>Education</h2>
                    </div>
                    {cvData.education.map((education, index) => (
                      <div key={index} className="xp-item">
                        <div className="xp-job">
                          {education.degree}
                          <span>@ {education.institution}</span>
                          <br />
                        </div>
                        <div className="xp-date">
                          {education.startDate} – {education.endDate}
                        </div>
                        {education.description[0] && (
                          <div className="xp-detail">
                            <ul>
                              {education.description.map((desc, i) => (
                                <li key={i}>{desc}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteItem('education', index)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Side Column */}
            <div className="resume__side">
              {/* Skills */}
              {cvData.skills.length > 0 && (
                <section className="resume__section resume__skills">
                  <div className="resume__content">
                    <div className="resume__section-title">
                      <img src="/skill.png" alt="Skill" />
                      <h2>Skills</h2>
                    </div>
                    <div className="resume__text">
                      {cvData.skills.map((skill, index) => (
                        <div key={index} className="extra">
                          <div className="extra-info">
                            {skill.name}
                          </div>
                          <div className="extra-details">
                            <div
                              className="extra-details__progress"
                              style={{ width: skill.progress }}
                            ></div>
                          </div>
                          <button
                            className="delete-button"
                            onClick={() => handleDeleteItem('skills', index)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Languages */}
              {cvData.languages.length > 0 && (
                <section className="resume__section resume__languages">
                  <div className="resume__content">
                    <div className="resume__section-title">
                      <img src="/language.png" alt="Language" />
                      <h2>Languages</h2>
                    </div>
                    {cvData.languages.map((language, index) => (
                      <div key={index} className="extra">
                        <div className="extra-info">
                          {language.name}
                        </div>
                        <div className="extra-details">
                          <div
                            className="extra-details__progress"
                            style={{ width: language.progress }}
                          ></div>
                        </div>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteItem('languages', index)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Volunteering Experience */}
              {cvData.volunteeringExperience.length > 0 && (
                <section className="resume__section resume__volunteering">
                  <div className="resume__content">
                    <div className="resume__section-title">
                      <img src="/volunteering.png" alt="Volunteering" />
                      <h2>Volunteering</h2>
                    </div>
                    {cvData.volunteeringExperience.map(
                      (volunteer, index) => (
                        <div key={index} className="xp-item">
                          <div className="xp-job">
                            {volunteer.position}{' '}
                            <span>@ {volunteer.organization}</span>
                            <br />
                            <small>{volunteer.location}</small>
                          </div>
                          <div className="xp-date">
                            {volunteer.startDate} – {volunteer.endDate}
                          </div>
                          {volunteer.description[0] && (
                            <div className="xp-detail">
                              <ul>
                                {volunteer.description.map((desc, i) => (
                                  <li key={i}>{desc}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <button
                            className="delete-button"
                            onClick={() =>
                              handleDeleteItem(
                                'volunteeringExperience',
                                index
                              )
                            }
                          >
                            Delete
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVTemplate;
