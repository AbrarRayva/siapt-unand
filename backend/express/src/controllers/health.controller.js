/**
 * Health check controller
 */
export const getHealth = (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'backend-express',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};
