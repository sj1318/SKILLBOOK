
import React, { useState, useEffect } from 'react';
import { storyAPI } from '../api';
import './StoriesFeed.css';

const StoriesFeed = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newStory, setNewStory] = useState({
    skillName: '',
    description: ''
  });

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      const response = await storyAPI.getAllStories();
      if (response.success) {
        setStories(response.stories || []);
      } else {
        setError(response.message || 'Failed to load stories');
      }
    } catch (error) {
      console.error('Error loading stories:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStory = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await storyAPI.createStory(newStory);
      if (response.success) {
        setStories([response.story, ...stories]);
        setNewStory({ skillName: '', description: '' });
        setShowCreateForm(false);
        setSuccess('Story shared successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Failed to create story');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewStory({
      ...newStory,
      [e.target.name]: e.target.value
    });
  };

  const handleFindSwap = () => {
    // Navigate to skills or create a skill swap functionality
    console.log('Find a swap clicked');
    // You can implement skill swap logic here
    alert('Skill swap feature coming soon!');
  };

  if (loading) {
    return (
      <div className="stories-feed">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading stories...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stories-feed">
      <div className="container">
        <div className="feed-header">
          <div className="header-content">
            <h1 className="feed-title">Skill Stories</h1>
            <p className="feed-subtitle">
              Discover inspiring skill journeys from our community
            </p>
          </div>
          <div className="header-actions">
            <button 
              className="btn btn-secondary find-swap-btn"
              onClick={handleFindSwap}
            >
              🔄 Find a Swap
            </button>
            <button 
              className="btn btn-primary create-story-btn"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              {showCreateForm ? 'Cancel' : '✍️ Share Your Story'}
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {showCreateForm && (
          <div className="create-story-section">
            <div className="card create-story-card">
              <h3 className="form-title">Share Your Skill Story</h3>
              <form onSubmit={handleCreateStory} className="story-form">
                <div className="form-group">
                  <label htmlFor="skillName">Skill Name</label>
                  <input
                    type="text"
                    id="skillName"
                    name="skillName"
                    value={newStory.skillName}
                    onChange={handleInputChange}
                    placeholder="e.g., React Development, Digital Marketing"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Your Story</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newStory.description}
                    onChange={handleInputChange}
                    placeholder="Share your learning journey, challenges, and achievements..."
                    rows="6"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={createLoading}
                  >
                    {createLoading ? 'Publishing...' : 'Publish Story'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="stories-container">
          {stories.length > 0 ? (
            <div className="stories-grid">
              {stories.map((story, index) => (
                <article key={story._id || index} className="story-card card">
                  <div className="story-header">
                    <div className="story-author">
                      <div className="author-avatar">
                        {story.postedBy?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div className="author-info">
                        <h4 className="author-name">{story.postedBy?.name || 'Anonymous'}</h4>
                        <time className="story-date">
                          {new Date(story.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                      </div>
                    </div>
                    <div className="story-menu">
                      <button className="menu-btn">⋯</button>
                    </div>
                  </div>
                  
                  <div className="story-content">
                    <h2 className="story-title">{story.skillName}</h2>
                    <p className="story-description">{story.text || story.description}</p>
                  </div>
                  
                  <div className="story-footer">
                    <div className="story-actions">
                      <button className="action-btn like-btn">
                        <span className="action-icon">❤️</span>
                        <span className="action-text">Like</span>
                      </button>
                      <button className="action-btn comment-btn">
                        <span className="action-icon">💬</span>
                        <span className="action-text">Comment</span>
                      </button>
                      <button className="action-btn share-btn">
                        <span className="action-icon">🔗</span>
                        <span className="action-text">Share</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-stories">
              <div className="no-stories-content">
                <div className="no-stories-icon">📚</div>
                <h3>No stories yet</h3>
                <p>Be the first to share your skill learning journey!</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowCreateForm(true)}
                >
                  Share Your First Story
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoriesFeed;
