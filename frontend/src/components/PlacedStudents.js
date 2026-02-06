import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import API from '../services/api';
import EmptyState from './EmptyState';
import toast from 'react-hot-toast';

function PlacedStudents({ isPreview = false }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await API.get('/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      // Assuming 'toast' is imported or globally available, e.g., from react-toastify
      // If not, you'll need to add: import { toast } from 'react-toastify';
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await API.delete(`/students/${id}`);
      toast.success('Student deleted successfully!');
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Failed to delete student');
    } finally {
      setDeleting(false);
    }
  };

  const displayedStudents = isPreview ? students.slice(0, 5) : students;

  // Smart Navigation Handler
  const handleBack = () => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }
  };

  if (loading) return <div className="text-center mt-4">Loading placed students...</div>;

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
        {/* Back Arrow for Full Page View */}
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

        <h2 className="section-title" style={{ margin: 0 }}>Placed Students</h2>
        {isPreview && students.length > 5 && (
          <Link to="/placed" className="view-all" style={{ textDecoration: 'none', marginLeft: 'auto' }}>
            View All →
          </Link>
        )}
      </div>

      <div className="table-container" style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: 'var(--shadow-soft)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr style={{ background: '#f5f7f9', color: 'var(--gray-text)', textAlign: 'left' }}>
              <th style={{ padding: '16px', borderRadius: '8px 0 0 8px' }}>Student Name</th>
              <th style={{ padding: '16px' }}>Student ID</th>
              <th style={{ padding: '16px' }}>Department</th>
              <th style={{ padding: '16px' }}>Company</th>
              <th style={{ padding: '16px', borderRadius: '0 8px 8px 0' }}>Package</th>
              {!isPreview && isAdmin && <th style={{ padding: '16px' }}>Action</th>}
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <EmptyState type="students" />
            ) : (
              displayedStudents.map(student => (
                <tr key={student._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '16px', fontWeight: '600', color: 'var(--gray-dark)' }}>{student.name}</td>
                  <td style={{ padding: '16px', color: '#6b7280' }}>{student.studentId}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ background: '#e8f7ee', color: 'var(--green-dark)', padding: '4px 10px', borderRadius: '4px', fontSize: '13px', fontWeight: '600' }}>
                      {student.department}
                    </span>
                  </td>
                  <td style={{ padding: '16px', fontWeight: '600' }}>{student.company?.name || "N/A"}</td>
                  <td style={{ padding: '16px' }}>{student.company?.package || "N/A"} LPA</td>
                  {!isPreview && isAdmin && (
                    <td style={{ padding: '16px' }}>
                      <button
                        onClick={() => handleDelete(student._id)}
                        style={{
                          background: '#fee2e2',
                          color: '#dc2626',
                          border: 'none',
                          padding: '8px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <FaTrash size={12} /> Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PlacedStudents;
