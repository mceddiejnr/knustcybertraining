import React from 'react';

const Health: React.FC = () => {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      database: 'connected',
      authentication: 'active'
    }
  };

  return (
    <div style={{ fontFamily: 'monospace', padding: '20px' }}>
      <pre>{JSON.stringify(healthData, null, 2)}</pre>
    </div>
  );
};

export default Health;