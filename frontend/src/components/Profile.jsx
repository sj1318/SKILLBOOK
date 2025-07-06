
import React, { useState, useEffect } from 'react';
import { userAPI } from '../api';
import SkillUpdate from './SkillUpdate';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: ''
  });
  const [showSkillUpdate, setShowSkillUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('User ID not found');
        setLoading(false);
        return;
      }

      const response = await userAPI.getUser(userId);

      if (response.success) {
        setUser(response.user);
        setEditForm({
          name: response.user.name || '',
          email: response.user.email || ''
        });
      } else {
        setError(response.message || 'Failed to load profile');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setError('');
    setSuccess('');

    try {
      const userId = localStorage.getItem('userId');
      const response = await userAPI.updateUser(userId, editForm);
      
      if (response.success) {
        setUser(response.user);
        setIsEditing(false);
        setSuccess('Profile updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Failed to update profile');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const getSkillTagClass = (category) => {
    const categoryMap = {
      programming: 'javascript',
      design: 'design',
      business: 'nodejs',
      marketing: 'react',
      other: 'default'
    };
    return categoryMap[category] || 'default';
  };

  const handleSkillAdded = (newSkill) => {
    // Refresh user data to show updated skills
    loadUserData();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-banner">
            <div className="profile-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{user?.name || 'User'}</h1>
              <p className="profile-email">{user?.email}</p>
              <p className="profile-bio">
                {user?.skills?.length > 0 
                  ? `Skilled in ${user.skills.length} area${user.skills.length === 1 ? '' : 's'}`
                  : 'No skills shared yet'
                }
              </p>
            </div>
            <div className="profile-actions">
              <button 
                className="btn btn-primary"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {isEditing && (
          <div className="edit-profile-section">
            <div className="card">
              <h2 className="section-title">Edit Profile</h2>
              <form onSubmit={handleEditSubmit} className="edit-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={updateLoading}
                  >
                    {updateLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="profile-stats">
          <div className="stat-card card">
            <h3 className="stat-number">{user?.skills?.length || 0}</h3>
            <p className="stat-label">Skills Shared</p>
          </div>
          <div className="stat-card card">
            <h3 className="stat-number">0</h3>
            <p className="stat-label">Stories Posted</p>
          </div>
          <div className="stat-card card">
            <h3 className="stat-number">0</h3>
            <p className="stat-label">Connections</p>
          </div>
        </div>

        <div className="skills-management">
          <div className="section-header">
            <h2 className="section-title">Your Skills</h2>
            <button 
              className="btn btn-primary"
              onClick={() => setShowSkillUpdate(!showSkillUpdate)}
            >
              {showSkillUpdate ? 'Hide Form' : 'Share New Skill'}
            </button>
          </div>

          {showSkillUpdate && (
            <SkillUpdate onSkillAdded={handleSkillAdded} />
          )}

          <div className="skills-display">
            {user?.skills && user.skills.length > 0 ? (
              <div className="skills-grid">
                {user.skills.map((skill, index) => (
                  <div key={index} className="skill-card card">
                    <div className="skill-header">
                      <span className={`skill-tag ${getSkillTagClass(skill.category || 'other')}`}>
                        {skill.category || 'other'}
                      </span>
                    </div>
                    <h3 className="skill-name">{skill.name || skill}</h3>
                    <p className="skill-description">{skill.description || 'No description provided'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-skills-message">
                <h3>No skills shared yet</h3>
                <p>Start by sharing your first skill to showcase your expertise!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
