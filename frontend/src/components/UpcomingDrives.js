import { useState } from 'react';

function UpcomingDrives() {
  const [showAll, setShowAll] = useState(false);
  
  const allDrives = [
    {
      company: "Google",
      role: "Web Developer",
      date: "2025-10-19",
      time: "10:30 AM",
      package: "10 LPA",
      eligibility: "IT, CSE",
      cgpa: "8.0",
      gradient: "google-gradient"
    },
    {
      company: "TCS",
      role: "IT Coordinator",
      date: "2025-10-14",
      time: "01:00 PM",
      package: "12 LPA",
      eligibility: "AIML, IT",
      cgpa: "7.0",
      gradient: "tcs-gradient"
    },
    {
      company: "Zoho",
      role: "Data Analyst",
      date: "2025-10-17",
      time: "11:00 AM",
      package: "9 LPA",
      eligibility: "CSE, AIDS",
      cgpa: "8.0",
      gradient: "zoho-gradient"
    },
    {
      company: "Amazon",
      role: "SDE Intern",
      date: "2025-10-20",
      time: "02:00 PM",
      package: "15 LPA",
      eligibility: "CSE, IT, AIML",
      cgpa: "8.5",
      gradient: "amazon-gradient"
    },
    {
      company: "Microsoft",
      role: "Cloud Engineer",
      date: "2025-10-18",
      time: "09:00 AM",
      package: "14 LPA",
      eligibility: "CSE, IT",
      cgpa: "8.0",
      gradient: "microsoft-gradient"
    },
    {
      company: "Meta",
      role: "Frontend Developer",
      date: "2025-10-22",
      time: "11:30 AM",
      package: "18 LPA",
      eligibility: "CSE, AIDS",
      cgpa: "8.5",
      gradient: "facebook-gradient"
    }
  ];

  const drives = showAll ? allDrives : allDrives.slice(0, 3);

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Featured Upcoming Drives</h2>
        <button 
          className="view-all" 
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All →"}
        </button>
      </div>

      <div className="drives-grid">
        {drives.map((drive, index) => (
          <div className="drive-card" key={index}>
            
            <div className={`drive-header ${drive.gradient}`}>
              <span className="drive-date">{drive.date}</span>
              <div className="drive-company">
                <div className="drive-company-name">{drive.company}</div>
                <div className="drive-role">{drive.role} (Upcoming)</div>
              </div>
            </div>

            <div className="drive-body">
              <div className="drive-meta">
                <span className="drive-package">Package: {drive.package}</span>
                <span className="drive-time">{drive.time}</span>
              </div>

              <p className="drive-description">
                Looking for talented candidates with strong problem-solving skills and good communication abilities.
              </p>

              <div className="drive-footer">
                <span className="drive-eligibility">
                  Eligibility: {drive.eligibility} | Min CGPA: {drive.cgpa}
                </span>
                <button className="drive-btn">View Eligibility</button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

export default UpcomingDrives;