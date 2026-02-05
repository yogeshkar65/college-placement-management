import { FaGraduationCap, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
    return (
        <footer style={{
            background: 'linear-gradient(135deg, #166534, #14532d)',
            color: 'white',
            padding: '40px 24px 20px',
            marginTop: '60px'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '32px',
                marginBottom: '32px'
            }}>
                {/* About Section */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <FaGraduationCap size={24} />
                        <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
                            College Placement Portal
                        </h3>
                    </div>
                    <p style={{ fontSize: '14px', opacity: '0.9', lineHeight: '1.6' }}>
                        Connecting students with career opportunities and building industry partnerships for a brighter future.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style={{ marginBottom: '8px' }}>
                            <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', opacity: '0.9' }}>
                                Home
                            </a>
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <a href="/upcoming" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', opacity: '0.9' }}>
                                Upcoming Drives
                            </a>
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <a href="/companies" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', opacity: '0.9' }}>
                                Partner Companies
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Contact Us</h4>
                    <div style={{ fontSize: '14px', opacity: '0.9' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <FaEnvelope size={14} />
                            <span>placements@college.edu</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <FaPhone size={14} />
                            <span>+91 12345 67890</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <FaMapMarkerAlt size={14} style={{ marginTop: '4px' }} />
                            <span>Placement Cell, College Campus</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                paddingTop: '20px',
                textAlign: 'center',
                fontSize: '14px',
                opacity: '0.8'
            }}>
                © {new Date().getFullYear()} College Placement Portal. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
