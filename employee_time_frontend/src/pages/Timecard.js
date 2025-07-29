import React, { useEffect, useState } from 'react';
import { supabase } from '../components/AuthProvider';
import { useAuth } from '../components/AuthProvider';

// PUBLIC_INTERFACE
const Timecard = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ date: '', hours: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchEntries() {
      // Placeholder: Replace with call to backend for this user's entries
      setEntries([
        { date: '2024-06-01', hours: 8 },
        { date: '2024-05-31', hours: 8 },
        { date: '2024-05-30', hours: 7.5 }
      ]);
    }
    fetchEntries();
  }, [user]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    // TODO: Call backend to post new timecard entry
    if (!form.date || !form.hours) {
      setError('Please fill all fields.');
      setSubmitting(false);
      return;
    }
    setTimeout(() => {
      setEntries(prev => [{ date: form.date, hours: form.hours }, ...prev]);
      setForm({ date: '', hours: '' });
      setSubmitting(false);
    }, 800); // Remove this: replace with real backend call!
  };

  return (
    <div>
      <section className="etp-dashboard-section" style={{maxWidth: 500}}>
        <h2 className="etp-title">Timecard Entry</h2>
        <form className="etp-form" onSubmit={handleSubmit}>
          <label htmlFor="tc-date">Date</label>
          <input
            id="tc-date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            disabled={submitting}
            max={new Date().toISOString().split('T')[0]}
          />
          <label htmlFor="tc-hours">Hours Worked</label>
          <input
            id="tc-hours"
            name="hours"
            type="number"
            value={form.hours}
            onChange={handleChange}
            min={0.5}
            max={24}
            step={0.25}
            required
            disabled={submitting}
          />
          {error && <div style={{color:'#e74c3c'}}>{error}</div>}
          <button className="etp-btn etp-btn-accent" type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </section>
      <section className="etp-dashboard-section" style={{maxWidth: 700}}>
        <h3 style={{margin:"0 0 18px 0"}}>Your Recent Timecards</h3>
        <table className="etp-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(entry =>
              <tr key={entry.date}>
                <td>{entry.date}</td>
                <td>{entry.hours}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Timecard;
