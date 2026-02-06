import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import API from '../services/api';
import { ShimmerCard } from './Shimmer';
import EmptyState from './EmptyState';
import toast from 'react-hot-toast';

function CompanyList({ isPreview = false }) {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const { data } = await API.get('/companies');
                setCompanies(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching companies:", error);
                setLoading(false);
            }
        };
        fetchCompanies();
    }, []);

    const handleDelete = async (id) => {
        try {
            await API.delete(`/companies/${id}`);
            toast.success('Company deleted successfully!');
            const { data } = await API.get('/companies');
            setCompanies(data);
        } catch (error) {
            console.error("Error deleting company:", error);
            toast.error('Failed to delete company');
        }
    };

    const displayedCompanies = isPreview ? companies.slice(0, 12) : companies;

    const handleBack = () => {
        if (isAdmin) {
            navigate('/admin/dashboard');
        } else {
            navigate('/');
        }
    };

    if (loading) {
        return (
            <div className="section">
                <div className="section-header">
                    <h2 className="section-title">Partner Companies</h2>
                </div>
                <div className="drives-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                    {[1, 2, 3, 4].map(i => <ShimmerCard key={i} />)}
                </div>
            </div>
        );
    }

    return (
        <div className="section">
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

                <h2 className="section-title" style={{ margin: 0 }}>Partner Companies</h2>
                {isPreview && companies.length > 12 && (
                    <Link to="/companies" className="view-all" style={{ textDecoration: 'none', marginLeft: 'auto' }}>
                        View All →
                    </Link>
                )}
            </div>

            <div className="drives-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                {companies.length === 0 ? (
                    <div style={{ gridColumn: '1 / -1' }}>
                        <EmptyState
                            type="companies"
                            action={localStorage.getItem('isAdmin') === 'true' && (
                                <Link to="/admin/add-company" className="drive-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                                    Add Your First Company
                                </Link>
                            )}
                        />
                    </div>
                ) : displayedCompanies.map(company => (
                    <div key={company._id} className="partner-card" style={{ position: 'relative' }}>
                        {!isPreview && isAdmin && (
                            <button
                                onClick={() => handleDelete(company._id)}
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    background: '#fee2e2',
                                    color: '#dc2626',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <FaTrash size={12} />
                            </button>
                        )}

                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: (() => {
                                const firstChar = company.name.charAt(0).toUpperCase();
                                const colors = {
                                    'A': '#16a34a', 'B': '#2563eb', 'C': '#dc2626', 'D': '#ea580c',
                                    'E': '#65a30d', 'F': '#0891b2', 'G': '#DB4437', 'H': '#7c3aed',
                                    'I': '#059669', 'J': '#4f46e5', 'K': '#be123c', 'L': '#0369a1',
                                    'M': '#00a4ef', 'N': '#84cc16', 'O': '#f97316', 'P': '#a855f7',
                                    'Q': '#14b8a6', 'R': '#ef4444', 'S': '#3b82f6', 'T': '#10b981',
                                    'U': '#8b5cf6', 'V': '#06b6d4', 'W': '#22c55e', 'X': '#f59e0b',
                                    'Y': '#eab308', 'Z': '#22d3ee'
                                };
                                return colors[firstChar] || '#6b7280';
                            })(),
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '24px',
                            fontWeight: 'bold'
                        }}>
                            {company.name.charAt(0)}
                        </div>
                        <h3 style={{ fontSize: '18px', color: 'var(--gray-dark)' }}>{company.name}</h3>
                        <span style={{ fontSize: '13px', color: 'var(--gray-text)', background: '#f5f7f9', padding: '4px 8px', borderRadius: '4px' }}>
                            {company.role}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CompanyList;
