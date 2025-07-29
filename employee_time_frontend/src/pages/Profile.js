import React, { useState } from 'react';
import { useAuth } from '../components/AuthProvider';

// PUBLIC_INTERFACE
const Profile = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.user_metadata?.name || '', email: user?.email || '' });
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setStatus('');
  };

  const handleSave = async e => {
    e.preventDefault();
    setStatus('Saving...');
    // TODO: Patch user profile via backend
    setTimeout(() => {
      setStatus('Profile updated!');
      setEditing(false);
    }, 800);
  };

  if (!user) return <div className="etp-page-centered">Loading profile...</div>;

  return (
    <section className="etp-dashboard-section" style={{maxWidth:430}}>
      <div className="etp-profile-header">
        <img
          className="etp-profile-avatar"
          src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.email}`}
          alt="avatar"
        />
        <div>
          <h2 className="etp-title" style={{marginBottom:0, fontSize:'1.5rem'}}>My Profile</h2>
          <div style={{color:"#777", fontSize:"0.99rem"}}>{user.email}</div>
        </div>
      </div>
      <form className="etp-form" onSubmit={handleSave} autoComplete="nope">
        <label htmlFor="profile-name">Name</label>
        <input
          id="profile-name"
          name="name"
          value={form.name}
          onChange={handleChange}
          disabled={!editing}
          placeholder="Your Name"
        />
        <label htmlFor="profile-email">Email</label>
        <input
          id="profile-email"
          name="email"
          value={form.email}
          onChange={handleChange}
          disabled
        />
        <div style={{display:'flex', gap:'8px', marginTop:'8px'}}>
          {editing ? (
            <button className="etp-btn etp-btn-accent" type="submit">
              Save
            </button>
          ) : (
            <button className="etp-btn etp-btn-accent" type="button" onClick={() => setEditing(true)}>
              Edit
            </button>
          )}
        </div>
        {status && <div style={{marginTop:10, color:'#388e3c'}}>{status}</div>}
      </form>
    </section>
  );
};

export default Profile;
