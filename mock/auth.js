export default {
  'GET /kingbee-user/auth': (req, res) => {
    res.send({
      code: 1,
      message: '成功',
      object: { name: 'lin', role: 'admin' },
    });
  },
};
