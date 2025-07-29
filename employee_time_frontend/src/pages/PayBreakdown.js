import React, { useEffect, useState } from 'react';
import { supabase } from '../components/AuthProvider';
import { useAuth } from '../components/AuthProvider';

// PUBLIC_INTERFACE
const PayBreakdown = () => {
  const { user } = useAuth();
  const [pay, setPay] = useState(null);

  useEffect(() => {
    async function fetchPay() {
      // Placeholder: Replace with actual backend API integration.
      setPay({
        period: '2024-05-15 to 2024-05-30',
        gross: 2200.00,
        taxes: 279.45,
        net: 1920.55,
        items: [
          { label: "Gross", value: 2200.00 },
          { label: "Federal Tax", value: 142.55 },
          { label: "State Tax", value: 99.50 },
          { label: "FICA", value: 37.40 },
          { label: "Net Pay", value: 1920.55 }
        ]
      });
    }
    fetchPay();
  }, [user]);

  if (!user || !pay) return <div className="etp-page-centered">Pay breakdown loading...</div>;

  return (
    <div>
      <section className="etp-dashboard-section" style={{maxWidth:420}}>
        <h2 className="etp-title">Pay Breakdown</h2>
        <div style={{marginBottom:14, color:'#666'}}>Pay Period: <b>{pay.period}</b></div>
        <table className="etp-table">
          <tbody>
            {pay.items.map(item => (
              <tr key={item.label}>
                <td>{item.label}</td>
                <td style={{fontWeight: item.label==="Net Pay" ? 700 : 400, color: item.label==="Net Pay" ? "var(--etp-color-accent)" : "#222"}}>
                  ${item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default PayBreakdown;
