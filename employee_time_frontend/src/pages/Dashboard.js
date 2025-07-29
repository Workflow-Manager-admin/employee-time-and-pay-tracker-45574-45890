import React, { useEffect, useState } from 'react';
import { supabase } from '../components/AuthProvider';
import { useAuth } from '../components/AuthProvider';

// PUBLIC_INTERFACE
const Dashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function fetchSummary() {
      // Sample: Replace with actual API call to backend for summary!
      // Here, just fake some data for visual layout
      setSummary({
        totalHours: 96,
        mostRecentPay: 1920.55,
        mostRecentPeriod: '2024-05-15 to 2024-05-30',
        timecards: [
          { date: '2024-06-01', hours: 8 },
          { date: '2024-05-31', hours: 8 },
          { date: '2024-05-30', hours: 7.5 }
        ]
      });
    }
    fetchSummary();
  }, [user]);

  if (!user || !summary) return <div className="etp-page-centered">Loading dashboard...</div>;

  return (
    <div>
      <section className="etp-dashboard-section">
        <h2 className="etp-title" style={{marginBottom:8}}>Welcome back, {user.email}</h2>
        <div style={{display:'flex', flexWrap:'wrap', gap: '3rem', marginTop:12}}>
          <div>
            <div style={{fontSize:'2.1rem', fontWeight:'700', color:'var(--etp-color-accent)'}}>{summary.totalHours}h</div>
            <div>Total hours this month</div>
          </div>
          <div>
            <div style={{fontSize:'2.1rem', fontWeight:'700', color:'var(--etp-color-primary)'}}>${summary.mostRecentPay}</div>
            <div>Most recent paycheck</div>
          </div>
          <div>
            <div style={{fontSize:'1.1rem', color:'#666'}}>{summary.mostRecentPeriod}</div>
            <div>Pay period</div>
          </div>
        </div>
      </section>
      <section className="etp-dashboard-section">
        <h3 style={{margin:"0 0 16px 0"}}>Recent Timecard Activity</h3>
        <table className="etp-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {summary.timecards.map(tc =>
              <tr key={tc.date}>
                <td>{tc.date}</td>
                <td>{tc.hours}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;
