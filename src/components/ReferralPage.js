import React, { useState } from 'react';
import './ReferralsPage.css';

const ReferralsPage = () => {
  const [referralLink] = useState("https://example.com/referral/12345"); // Simulating the referral link
  const [referrals] = useState([
    { id: 1, name: 'JohnDoe', coinsGenerated: 150 },
    { id: 2, name: 'JaneSmith', coinsGenerated: 300 },
    { id: 3, name: 'AlexJohnson', coinsGenerated: 75 },
    { id: 4, name: 'MichaelBrown', coinsGenerated: 400 },
    { id: 5, name: 'EmilyWhite', coinsGenerated: 230 },
    { id: 6, name: 'ChristopherGreen', coinsGenerated: 120 },
    { id: 7, name: 'JessicaLee', coinsGenerated: 95 },
    { id: 8, name: 'DanielClark', coinsGenerated: 345 },
    { id: 9, name: 'DavidRodriguez', coinsGenerated: 178 },
    { id: 10, name: 'SarahMartinez', coinsGenerated: 213 },
    { id: 11, name: 'LauraLopez', coinsGenerated: 89 },
    { id: 12, name: 'JamesAnderson', coinsGenerated: 500 },
    { id: 13, name: 'KarenMoore', coinsGenerated: 250 },
    { id: 14, name: 'WilliamTaylor', coinsGenerated: 130 },
    { id: 15, name: 'KevinHarris', coinsGenerated: 160 },
    { id: 16, name: 'PatriciaMartin', coinsGenerated: 190 },
    { id: 17, name: 'LindaYoung', coinsGenerated: 275 },
    { id: 18, name: 'CharlesWalker', coinsGenerated: 310 },
    { id: 19, name: 'BarbaraKing', coinsGenerated: 125 },
    { id: 20, name: 'AnthonyScott', coinsGenerated: 450 },
    { id: 21, name: 'MatthewAdams', coinsGenerated: 135 },
    { id: 22, name: 'StevenBaker', coinsGenerated: 115 },
    { id: 23, name: 'MaryWright', coinsGenerated: 80 },
    { id: 24, name: 'RichardThompson', coinsGenerated: 290 },
    { id: 25, name: 'GeorgeMitchell', coinsGenerated: 320 },
  ]);


  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
  };

  return (
    <div className="referrals-container">
      <h2>Your Referral Program</h2>
      
      <div className="referral-link-section">
        <h3>Your Referral Link</h3>
        <button className="referral-link-button" onClick={handleCopyReferralLink}>
          Copy Referral Link
        </button>
        <p className="referral-link">{referralLink}</p>
      </div>

      <div className="referral-list-section">
        <h3>Your Referrals</h3>
        {referrals.length > 0 ? (
          <table className="referral-table">
            <thead>
              <tr>
                <th>Referral Username</th>
                <th>Coins Generated</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((referral) => (
                <tr key={referral.id}>
                  <td>{referral.name}</td>
                  <td>{referral.coinsGenerated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No referrals yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReferralsPage;
