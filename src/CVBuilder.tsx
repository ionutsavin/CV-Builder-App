import React, { useState, ChangeEvent } from 'react';
import CVTemplate from './CVTemplate';
import Popup from './Popup';
import './CVBuilder.css';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  photo: string | null;
  summary: string;
}

interface WorkExperience {
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

interface Education {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string[];
}

interface Skill {
  name: string;
  progress: string;
}

interface Language {
  name: string;
  progress: string;
}

interface VolunteeringExperience {
  position: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface CVData extends PersonalInfo {
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  volunteeringExperience: VolunteeringExperience[];
}

interface FormState extends PersonalInfo, WorkExperience, Education, Skill, Language, VolunteeringExperience {
    jobDescription: string;
    eduStartDate: string;
    eduEndDate: string;
    eduDescription: string;
    skillName: string;
    skillProgress: string;
    languageName: string;
    languageProgress: string;
    volunteerPosition: string;
    volunteerOrganization: string;
    volunteerLocation: string;
    volunteerStartDate: string;
    volunteerEndDate: string;
    volunteerDescription: string;
  }
  

const initialFormState: FormState = {
    name: '',
    email: '',
    phone: '',
    photo: null,
    summary: '',
    position: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    jobDescription: '',
    degree: '',
    institution: '',
    eduStartDate: '',
    eduEndDate: '',
    eduDescription: '',
    skillName: '',
    skillProgress: '',
    languageName: '',
    languageProgress: '',
    volunteerPosition: '',
    volunteerOrganization: '',
    volunteerLocation: '',
    volunteerStartDate: '',
    volunteerEndDate: '',
    volunteerDescription: '',
    description: [],
    progress: '',
    organization: ''
};

const CVBuilder: React.FC = () => {
  const [cvData, setCvData] = useState<CVData>({
    name: '',
    email: '',
    phone: '',
    photo: null,
    summary: '',
    workExperience: [],
    education: [],
    skills: [],
    languages: [],
    volunteeringExperience: [],
  });

  const [form, setForm] = useState<FormState>(initialFormState);

  const [sectionsVisible, setSectionsVisible] = useState({
    personalInfo: true,
    workExperience: false,
    education: false,
    skills: false,
    languages: false,
    volunteering: false,
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleSectionVisibility = (section: keyof typeof sectionsVisible) => {
    setSectionsVisible({
      ...sectionsVisible,
      [section]: !sectionsVisible[section],
    });
  };

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({
        ...form,
        photo: reader.result as string,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddPersonalInfo = () => {
    if (!form.name || !form.email || !form.phone) {
      setPopupMessage('Name, Email, and Phone are required');
      setShowPopup(true);
      return;
    }
    setCvData({
      ...cvData,
      name: form.name,
      email: form.email,
      phone: form.phone,
      photo: form.photo,
      summary: form.summary,
    });
  };

  const handleAddWorkExperience = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!form.position || !form.company || !form.location || !form.startDate || !form.endDate) {
      setPopupMessage('Position, Company, Location, Start Date, and End Date are required');
      setShowPopup(true);
      return;
    } else if (new Date(form.startDate) >= new Date(form.endDate)) {
      setPopupMessage('End Date must be later than Start Date');
      setShowPopup(true);
      return;
    }
    setCvData({
      ...cvData,
      workExperience: [
        ...cvData.workExperience,
        {
          position: form.position,
          company: form.company,
          location: form.location,
          startDate: form.startDate,
          endDate: form.endDate,
          description: form.jobDescription.split('\n'),
        },
      ],
    });
    setForm({ ...form, position: '', company: '', location: '', startDate: '', endDate: '', jobDescription: '' });
  };

  const handleAddEducation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!form.degree || !form.institution || !form.eduStartDate || !form.eduEndDate) {
      setPopupMessage('Degree, Institution, Start Date, and End Date are required');
      setShowPopup(true);
      return;
    } else if (new Date(form.eduStartDate) >= new Date(form.eduEndDate)) {
      setPopupMessage('End Date must be later than Start Date');
      setShowPopup(true);
      return;
    }
    setCvData({
      ...cvData,
      education: [
        ...cvData.education,
        {
          degree: form.degree,
          institution: form.institution,
          startDate: form.eduStartDate,
          endDate: form.eduEndDate,
          description: form.eduDescription.split('\n'),
        },
      ],
    });
    setForm({ ...form, degree: '', institution: '', eduStartDate: '', eduEndDate: '', eduDescription: '' });
  };

  const handleAddSkill = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const progress = parseInt(form.skillProgress, 10);
    if (!form.skillName || !form.skillProgress) {
      setPopupMessage('Skill Name and Progress are required');
      setShowPopup(true);
      return;
    } else if (progress < 0 || progress > 100) {
      setPopupMessage('Skill Progress must be between 0 and 100');
      setShowPopup(true);
      return;
    }
    setCvData({
      ...cvData,
      skills: [
        ...cvData.skills,
        {
          name: form.skillName,
          progress: form.skillProgress + '%',
        },
      ],
    });
    setForm({ ...form, skillName: '', skillProgress: '' });
  };

  const handleAddLanguage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const progress = parseInt(form.languageProgress, 10);
    if (!form.languageName || !form.languageProgress) {
      setPopupMessage('Language Name and Progress are required');
      setShowPopup(true);
      return;
    } else if (progress < 0 || progress > 100) {
      setPopupMessage('Language Progress must be between 0 and 100');
      setShowPopup(true);
      return;
    }
    setCvData({
      ...cvData,
      languages: [
        ...cvData.languages,
        {
          name: form.languageName,
          progress: form.languageProgress + '%',
        },
      ],
    });
    setForm({ ...form, languageName: '', languageProgress: '' });
  };

  const handleAddVolunteeringExperience = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!form.volunteerPosition || !form.volunteerOrganization || !form.volunteerLocation || !form.volunteerStartDate || !form.volunteerEndDate) {
      setPopupMessage('Position, Organization, Location, Start Date, and End Date are required');
      setShowPopup(true);
      return;
    }
    if (new Date(form.volunteerStartDate) >= new Date(form.volunteerEndDate)) {
      setPopupMessage('End Date must be later than Start Date');
      setShowPopup(true);
      return;
    }
    setCvData({
      ...cvData,
      volunteeringExperience: [
        ...cvData.volunteeringExperience,
        {
          position: form.volunteerPosition,
          organization: form.volunteerOrganization,
          location: form.volunteerLocation,
          startDate: form.volunteerStartDate,
          endDate: form.volunteerEndDate,
          description: form.volunteerDescription.split('\n'),
        },
      ],
    });
    setForm({ ...form, volunteerPosition: '', volunteerOrganization: '', volunteerLocation: '', volunteerStartDate: '', volunteerEndDate: '', volunteerDescription: '' });
  };

  const handleDeleteItem = (section: keyof CVData, index: number) => {
    setCvData((prevData) => {
      const sectionData = prevData[section];
  
      if (Array.isArray(sectionData)) {
        const updatedSection = [...sectionData];
        updatedSection.splice(index, 1);
        return { ...prevData, [section]: updatedSection };
      }
  
      return prevData; // If the section is not an array, return the previous state unmodified.
    });
  };
  

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="container">
      {showPopup && <Popup message={popupMessage} closePopup={closePopup} />}
      <div className="form-container">
        <h1>CV Builder</h1>
        <div className="section-header" onClick={() => toggleSectionVisibility('personalInfo')}>
          <h2>Personal Information</h2>
        </div>
        {sectionsVisible.personalInfo && (
          <div className="section-content">
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <label>Phone:</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
            </div>
            <div className="photo-upload">
              <label htmlFor="photo" className="photo-label">Upload Photo:</label>
              <input type="file" id="photo" accept="image/*" className="photo-input" onChange={handlePhotoUpload} />
            </div>
            <div>
              <label>Summary:</label>
              <textarea name="summary" value={form.summary} onChange={handleChange}></textarea>
            </div>
            <button type="button" onClick={handleAddPersonalInfo}>Update Personal Info</button>
          </div>
        )}

        <div className="section-header" onClick={() => toggleSectionVisibility('workExperience')}>
          <h2>Work Experience</h2>
        </div>
        {sectionsVisible.workExperience && (
          <div className="section-content">
            <div>
              <label>Position:</label>
              <input type="text" name="position" value={form.position} onChange={handleChange} />
            </div>
            <div>
              <label>Company:</label>
              <input type="text" name="company" value={form.company} onChange={handleChange} />
            </div>
            <div>
              <label>Location:</label>
              <input type="text" name="location" value={form.location} onChange={handleChange} />
            </div>
            <div>
              <label>Start Date:</label>
              <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
            </div>
            <div>
              <label>End Date:</label>
              <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
            </div>
            <div>
              <label>Job Description:</label>
              <textarea name="jobDescription" value={form.jobDescription} onChange={handleChange}></textarea>
            </div>
            <button onClick={handleAddWorkExperience}>Add Work Experience</button>
          </div>
        )}

        <div className="section-header" onClick={() => toggleSectionVisibility('education')}>
          <h2>Education</h2>
        </div>
        {sectionsVisible.education && (
          <div className="section-content">
            <div>
              <label>Degree:</label>
              <input type="text" name="degree" value={form.degree} onChange={handleChange} />
            </div>
            <div>
              <label>Institution:</label>
              <input type="text" name="institution" value={form.institution} onChange={handleChange} />
            </div>
            <div>
              <label>Start Date:</label>
              <input type="date" name="eduStartDate" value={form.eduStartDate} onChange={handleChange} />
            </div>
            <div>
              <label>End Date:</label>
              <input type="date" name="eduEndDate" value={form.eduEndDate} onChange={handleChange} />
            </div>
            <div>
              <label>Description:</label>
              <textarea name="eduDescription" value={form.eduDescription} onChange={handleChange}></textarea>
            </div>
            <button onClick={handleAddEducation}>Add Education</button>
          </div>
        )}

        <div className="section-header" onClick={() => toggleSectionVisibility('skills')}>
          <h2>Skills</h2>
        </div>
        {sectionsVisible.skills && (
          <div className="section-content">
            <div>
              <label>Skill Name:</label>
              <input type="text" name="skillName" value={form.skillName} onChange={handleChange} />
            </div>
            <div>
              <label>Progress:</label>
              <input type="number" name="skillProgress" value={form.skillProgress} onChange={handleChange} min="0" max="100" />
            </div>
            <button onClick={handleAddSkill}>Add Skill</button>
          </div>
        )}

        <div className="section-header" onClick={() => toggleSectionVisibility('languages')}>
          <h2>Languages</h2>
        </div>
        {sectionsVisible.languages && (
          <div className="section-content">
            <div>
              <label>Language Name:</label>
              <input type="text" name="languageName" value={form.languageName} onChange={handleChange} />
            </div>
            <div>
              <label>Progress:</label>
              <input type="number" name="languageProgress" value={form.languageProgress} onChange={handleChange} min="0" max="100" />
            </div>
            <button onClick={handleAddLanguage}>Add Language</button>
          </div>
        )}

        <div className="section-header" onClick={() => toggleSectionVisibility('volunteering')}>
          <h2>Volunteering Experience</h2>
        </div>
        {sectionsVisible.volunteering && (
          <div className="section-content">
            <div>
              <label>Position:</label>
              <input type="text" name="volunteerPosition" value={form.volunteerPosition} onChange={handleChange} />
            </div>
            <div>
              <label>Organization:</label>
              <input type="text" name="volunteerOrganization" value={form.volunteerOrganization} onChange={handleChange} />
            </div>
            <div>
              <label>Location:</label>
              <input type="text" name="volunteerLocation" value={form.volunteerLocation} onChange={handleChange} />
            </div>
            <div>
              <label>Start Date:</label>
              <input type="date" name="volunteerStartDate" value={form.volunteerStartDate} onChange={handleChange} />
            </div>
            <div>
              <label>End Date:</label>
              <input type="date" name="volunteerEndDate" value={form.volunteerEndDate} onChange={handleChange} />
            </div>
            <div>
              <label>Description:</label>
              <textarea name="volunteerDescription" value={form.volunteerDescription} onChange={handleChange}></textarea>
            </div>
            <button onClick={handleAddVolunteeringExperience}>Add Volunteering Experience</button>
          </div>
        )}
      </div>
      <CVTemplate cvData={cvData} handleDeleteItem={handleDeleteItem} />
    </div>
  );
};

export default CVBuilder;
