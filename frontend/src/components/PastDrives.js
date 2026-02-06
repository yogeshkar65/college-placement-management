import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import API from '../services/api';
import Modal from './Modal';
import { ShimmerCard } from './Shimmer';
import EmptyState from './EmptyState';
import toast from 'react-hot-toast';

function PastDrives({ isPreview = false }) {
  const [drives, setDrives] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    setLoading(true);
    try {
      const response = await API.get('/drives/past');
      setDrives(response.data);
    } catch (error) {
      console.error('Error fetching past drives:', error);
      toast.error('Failed to load past drives');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (drive) => {
    setSelectedDrive(drive);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDrive(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/drives/${id}`);
      toast.success('Drive deleted successfully!');
      fetchDrives();
    } catch (error) {
      console.error('Error deleting drive:', error);
      toast.error('Failed to delete drive');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getGradient = (index) => {
    const gradients = [
      "infosys-gradient", "ibm-gradient", "tcs-gradient",
      "facebook-gradient", "google-gradient", "amazon-gradient"
    ];
    return gradients[index % gradients.length];
  };

  const displayedDrives = isPreview ? drives.slice(0, 6) : drives;

  if (loading) {
    return (
      <section className="section">
        <div className="section-header" style={{ alignItems: 'center', gap: '20px' }}>
          <h2 className="section-title">Past Placement Drives</h2>
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
    <section className="section">
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

        <h2 className="section-title" style={{ margin: 0 }}>Past Placement Drives</h2>

        {isPreview && drives.length > 6 && (
          <Link to="/past" className="view-all" style={{ textDecoration: 'none', marginLeft: 'auto' }}>
            View All →
          </Link>
        )}
      </div>

      {drives.length === 0 ? (
        <EmptyState
          type="drives"
          message="No past drives completed yet"
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
                  <div className="drive-company-name">{drive.company?.name || "Unknown"}</div>
                  <div className="drive-role">{drive.company?.role || "Various Roles"}</div>
                </div>
              </div>

              <div className="drive-body">
                <div className="drive-meta">
                  <span className="drive-package">Package: {drive.company?.package || "N/A"}</span>
                  <span className="drive-time">Completed</span>
                </div>

                <p className="drive-description">
                  Recruited talented students for {drive.company?.role} role.
                </p>

                <div className="drive-footer">
                  <span className="drive-eligibility">
                    Eligible: {drive.eligibility.join(", ")}
                  </span>
                  <button
                    className="drive-btn"
                    onClick={() => openModal(drive)}
                  >
                    View Questions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Drive Details">
        {selectedDrive && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>{selectedDrive.company?.name}</h3>
              <span style={{ background: '#f0fdf4', color: '#166534', padding: '4px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>
                {selectedDrive.company?.role}
              </span>
            </div>

            <p><strong>Date:</strong> {formatDate(selectedDrive.date)}</p>
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ color: '#1e40af', marginBottom: '10px', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>
                Interview Questions Asked
              </h4>
              {selectedDrive.interviewQuestions && selectedDrive.interviewQuestions.length > 0 ? (
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                  {selectedDrive.interviewQuestions.map((q, i) => (
                    <li key={i} style={{ marginBottom: '8px' }}>{q}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontStyle: 'italic', color: '#666', padding: '20px', textAlign: 'center', background: '#f9fafb', borderRadius: '8px' }}>
                  No specific questions were recorded for this drive.
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

export default PastDrives;