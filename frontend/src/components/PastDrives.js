import { useState } from 'react';

function PastDrives() {
  const [showAll, setShowAll] = useState(false);
  
  const allPastDrives = [
    {
      company: "Infosys",
      role: "Business Analyst",
      date: "2025-11-03",
      time: "09:30 AM",
      package: "12 LPA",
      eligibility: "AIDS, CIVIL, IT",
      cgpa: "8.0",
      gradient: "infosys-gradient"
    },
    {
      company: "IBM",
      role: "Software Developer",
      date: "2025-10-28",
      time: "10:30 AM",
      package: "8 LPA",
      eligibility: "IT, CSE, AIML",
      cgpa: "7.0",
      gradient: "ibm-gradient"
    },
    {
      company: "Wipro",
      role: "System Engineer",
      date: "2025-10-25",
      time: "02:00 PM",
      package: "6.5 LPA",
      eligibility: "CSE, IT, ECE",
      cgpa: "7.5",
      gradient: "amazon-gradient"
    },
    {
      company: "Accenture",
      role: "Associate Software Engineer",
      date: "2025-10-20",
      time: "11:00 AM",
      package: "7 LPA",
      eligibility: "All Branches",
      cgpa: "7.0",
      gradient: "tcs-gradient"
    },
    {
      company: "Cognizant",
      role: "Programmer Analyst",
      date: "2025-10-18",
      time: "10:00 AM",
      package: "6.8 LPA",
      eligibility: "CSE, IT, AIML",
      cgpa: "7.2",
      gradient: "infosys-gradient"
    },
    {
      company: "Capgemini",
      role: "Software Engineer",
      date: "2025-10-15",
      time: "09:00 AM",
      package: "7.5 LPA",
      eligibility: "CSE, IT, AIDS",
      cgpa: "7.0",
      gradient: "facebook-gradient"
    }
  ];

  const pastDrives = showAll ? allPastDrives : allPastDrives.slice(0, 3);

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Past Placement Drives</h2>
        <button 
          className="view-all" 
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All →"}
        </button>
      </div>

      <div className="drives-grid">
        {pastDrives.map((drive, index) => (
          <div className="drive-card" key={index}>

            <div className={`drive-header ${drive.gradient}`}>
              <span className="drive-date">{drive.date}</span>
              <div className="drive-company">
                <div className="drive-company-name">{drive.company}</div>
                <div className="drive-role">{drive.role}</div>
              </div>
            </div>

            <div className="drive-body">
              <div className="drive-meta">
                <span className="drive-package">Package: {drive.package}</span>
                <span className="drive-time">{drive.time}</span>
              </div>

              <p className="drive-description">
                Successfully recruited candidates during this placement drive. Final results announced.
              </p>

              <div className="drive-footer">
                <span className="drive-eligibility">
                  Eligibility: {drive.eligibility} | Min CGPA: {drive.cgpa}
                </span>
                <button className="drive-btn drive-btn-gray">
                  View Questions
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

export default PastDrives;