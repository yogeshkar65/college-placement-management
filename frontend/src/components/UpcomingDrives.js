import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import API from '../services/api';
import { ShimmerCard } from './Shimmer';
import EmptyState from './EmptyState';
import toast from 'react-hot-toast';

function UpcomingDrives({ isPreview = false }) {
  const [drives, setDrives] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const { data } = await API.get('/drives/upcoming');
        setDrives(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching upcoming drives:", error);
        setLoading(false);
      }
    };
    fetchDrives();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/drives/${id}`);
      toast.success('Drive deleted successfully!');
      const { data } = await API.get('/drives/upcoming');
      setDrives(data);
    } catch (error) {
      console.error("Error deleting drive:", error);
      toast.error('Failed to delete drive');
    }
  };

  const openModal = (drive) => setSelectedDrive(drive);
  const closeModal = () => setSelectedDrive(null);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getGradient = (index) => {
    const gradients = ["tcs-gradient", "infosys-gradient", "amazon-gradient", "google-gradient", "facebook-gradient", "ibm-gradient"];
    return gradients[index % gradients.length];
  };

  const displayedDrives = isPreview ? drives.slice(0, 6) : drives;

  if (loading) {
    return (
      <section className="section">
        <div className="section-header" style={{ alignItems: 'center', gap: '20px' }}>
          <h2 className="section-title">Upcoming Placement Drives</h2>
        </div>
        <div className="drives-grid">
          {[1, 2, 3].map(i => <ShimmerCard key={i} />)}
        </div>
      </section>
    );
  }

  const handleBack = () => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <section style={{ padding: '20px 0' }}>
      <div
        className="section-header"
        style={{
          alignItems: 'center',
          gap: '20px',
          justifyContent: isPreview ? 'space-between' : 'flex-start'
        }}
      >
        {!isPreview && (
          <button
            onClick={handleBack}
            style={{
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '18px',
              color: '#166534',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            title={isAdmin ? "Back to Dashboard" : "Back to Home"}
          >
            <FaArrowLeft />
          </button>
        )}

        <h2 className="section-title" style={{ margin: 0 }}>Upcoming Placement Drives</h2>

        {isPreview && drives.length > 6 && (
          <Link to="/upcoming" className="view-all" style={{ textDecoration: 'none', marginLeft: 'auto' }}>
            View All →
          </Link>
        )}
      </div>

      {drives.length === 0 ? (
        <EmptyState
          type="drives"
          message="No upcoming drives scheduled"
          action={isAdmin ? (
            <Link to="/admin/add-drive" className="drive-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Schedule Your First Drive
            </Link>
          ) : null}
        />
      ) : (
        <div className="drives-grid">
          {displayedDrives.map((drive, index) => (
            <div className="drive-card" key={drive._id} style={{ position: 'relative' }}>
              {!isPreview && isAdmin && (
                <button
                  onClick={() => handleDelete(drive._id)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'white',
                    color: '#dc2626',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                  }}
                >
                  <FaTrash size={14} />
                </button>
              )}

              <div className={`drive-header ${getGradient(index)}`}>
                <span className="drive-date">{formatDate(drive.date)}</span>
                <div className="drive-company">
                  <div className="drive-company-name">{drive.company?.name}</div>
                  <div className="drive-role">{drive.company?.role}</div>
                </div>
              </div>

              <div className="drive-body">
                <div className="drive-meta">
                  <span className="drive-package">Package: {drive.company?.package}</span>
                  <span className="drive-time">{formatTime(drive.date)}</span>
                </div>

                <p className="drive-description">
                  Exciting opportunity to join {drive.company?.name} as a {drive.company?.role}. Prepare well!
                </p>

                <div className="drive-footer">
                  <span className="drive-eligibility">
                    Eligibility: {drive.eligibility.join(", ")}
                  </span>
                  <button className="drive-btn" onClick={() => openModal(drive)}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedDrive && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }} onClick={closeModal}>
          <div style={{
            background: 'white', borderRadius: '12px', padding: '30px',
            maxWidth: '600px', width: '90%', maxHeight: '80vh', overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, color: '#1e40af' }}>Drive Details</h2>
              <button onClick={closeModal} style={{
                background: 'none', border: 'none', fontSize: '24px',
                cursor: 'pointer', color: '#666'
              }}>×</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>{selectedDrive.company?.name}</h3>
              <span style={{ background: '#f0fdf4', color: '#166534', padding: '4px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>
                {selectedDrive.company?.role}
              </span>
            </div>

            <div style={{ marginBottom: '15px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
              <div>
                <p style={{ fontWeight: 'bold', marginBottom: '5px', color: '#555' }}>Date & Time</p>
                <p style={{ margin: 0 }}>{formatDate(selectedDrive.date)} at {formatTime(selectedDrive.date)}</p>
              </div>
              <div>
                <p style={{ fontWeight: 'bold', marginBottom: '5px', color: '#555' }}>Package</p>
                <p style={{ margin: 0, color: '#16a34a', fontWeight: '600' }}>{selectedDrive.company?.package}</p>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '5px', color: '#555' }}>Eligibility</p>
              <p style={{ margin: 0 }}>{selectedDrive.eligibility.join(", ")}</p>
            </div>

            {selectedDrive.description && (
              <div style={{ marginBottom: '15px' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '5px', color: '#555' }}>Description</p>
                <p style={{ margin: 0, lineHeight: '1.6' }}>{selectedDrive.description}</p>
              </div>
            )}

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button className="drive-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default UpcomingDrives;