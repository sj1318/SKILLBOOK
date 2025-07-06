
import React, { useState } from 'react';
import { skillAPI } from '../api';
import './SkillUpdate.css';

const SkillUpdate = ({ onSkillAdded }) => {
  const [newSkill, setNewSkill] = useState({
    name: '',
    description: '',
    category: 'programming'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await skillAPI.createSkill(newSkill);
      
      if (response.success) {
        setNewSkill({ name: '', description: '', category: 'programming' });
        setSuccess('Skill shared successfully!');
        setTimeout(() => setSuccess(''), 3000);
        
        // Notify parent component if callback provided
        if (onSkillAdded) {
          onSkillAdded(response.skill);
        }
      } else {
        setError(response.message || 'Failed to share skill');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewSkill({
      ...newSkill,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  return (
    <div className="skill-update">
      <div className="card skill-update-card">
        <h3 className="form-title">Share Your Skill</h3>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit} className="skill-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="skillName">Skill Name</label>
              <input
                type="text"
                id="skillName"
                name="name"
                value={newSkill.name}
                onChange={handleInputChange}
                placeholder="e.g., React Development, Digital Marketing"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="skillCategory">Category</label>
              <select
                id="skillCategory"
                name="category"
                value={newSkill.category}
                onChange={handleInputChange}
              >
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="marketing">Marketing</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="skillDescription">Description</label>
            <textarea
              id="skillDescription"
              name="description"
              value={newSkill.description}
              onChange={handleInputChange}
              placeholder="Describe your skill, what you can teach, and your experience level..."
              rows="4"
              required
            />
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Sharing...' : 'Share Skill'}
            </button>
          </div>
        </form>
        
        <div className="skill-tips">
          <h4 className="tips-title">💡 Tips for great skills:</h4>
          <ul className="tips-list">
            <li>Be specific about what you can teach</li>
            <li>Mention your experience level</li>
            <li>Include any relevant achievements or projects</li>
            <li>Think about what makes your approach unique</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkillUpdate;
