
import React, { useState, useEffect } from 'react';
import { userAPI, storyAPI } from '../api';
import SkillUpdate from './SkillUpdate';
import './HomePage.css';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [recentStories, setRecentStories] = useState([]);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('User not found');
        setLoading(false);
        return;
      }

      const [userResponse, storiesResponse] = await Promise.all([
        userAPI.getUser(userId),
        storyAPI.getAllStories()
      ]);

      if (userResponse.success) {
        setUser(userResponse.user);
      } else {
        setError(userResponse.message || 'Failed to load user data');
      }

      if (storiesResponse.success) {
        setRecentStories(storiesResponse.stories?.slice(0, 3) || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkillAdded = () => {
    // Refresh user data to show updated skills
    loadUserData();
  };

  const handleFindSwap = () => {
    // Navigate to skills or create a skill swap functionality
    console.log('Find a swap clicked');
    // You can implement skill swap logic here
    alert('Skill swap feature coming soon!');
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

  if (loading) {
    return (
      <div className="homepage">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage">
      <div className="container">
        {error && <div className="error-message">{error}</div>}
        
        <div className="welcome-section">
          <h1 className="welcome-title">
            Welcome back, {user?.name || 'Skillsharer'}! 👋
          </h1>
          <p className="welcome-subtitle">
            Ready to share your skills and learn something new today?
          </p>
        </div>

        <div className="actions-section">
          <div className="action-buttons">
            <button 
              className="action-btn swap-btn"
              onClick={() => setShowSkillForm(!showSkillForm)}
            >
              <span className="btn-icon">⚡</span>
              {showSkillForm ? 'Hide Skill Form' : 'Share New Skill'}
            </button>
            <button 
              className="action-btn find-swap-btn"
              onClick={handleFindSwap}
            >
              <span className="btn-icon">🔄</span>
              Find a Swap
            </button>
            <a href="/stories" className="action-btn challenge-btn">
              <span className="btn-icon">📚</span>
              Browse Stories
            </a>
            <button 
              className="action-btn share-btn"
              onClick={() => window.location.href = '/stories'}
            >
              <span className="btn-icon">🌟</span>
              Share Experience
            </button>
          </div>
        </div>

        {showSkillForm && (
          <div className="skill-form-section">
            <SkillUpdate onSkillAdded={handleSkillAdded} />
          </div>
        )}

        <div className="skills-section">
          <div className="section-header">
            <h2 className="section-title">Your Skills</h2>
            <span className="skill-count">{user?.skills?.length || 0} skills</span>
          </div>
          
          <div className="skills-container">
            {user?.skills && user.skills.length > 0 ? (
              user.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className={`skill-tag ${getSkillTagClass(skill.category || 'other')}`}
                >
                  {skill.name || skill}
                </span>
              ))
            ) : (
              <div className="no-skills">
                No skills shared yet. Start by sharing your first skill above! 🚀
              </div>
            )}
          </div>
        </div>

        <div className="stories-section">
          <div className="section-header">
            <h2 className="section-title">Recent Stories</h2>
            <a href="/stories" className="view-all-link">View all →</a>
          </div>
          
          {recentStories.length > 0 ? (
            <div className="stories-grid">
              {recentStories.map((story, index) => (
                <div key={story._id || index} className="story-card card">
                  <div className="story-header">
                    <div className="story-author">
                      <div className="author-avatar">
                        {story.postedBy?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <h4 className="author-name">{story.postedBy?.name || 'Anonymous'}</h4>
                        <p className="story-date">{new Date(story.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="story-content">
                    <h3 className="story-title">{story.skillName}</h3>
                    <p className="story-description">
                      {story.description && story.description.length > 150 
                        ? `${story.description.substring(0, 150)}...` 
                        : story.description || 'No description available'
                      }
                    </p>
                  </div>
                  <div className="story-actions">
                    <button className="action-icon">👍</button>
                    <button className="action-icon">💬</button>
                    <button className="action-icon">🔗</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-stories">
              No stories yet. Be the first to share your learning journey! ✨
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
