module.exports = function handleError(err, res) {
  console.log(err);
  return res.status(500).send({
    error: 'Something failed!',
    errorMessage: err.message || err.statusMessage
  });
}
