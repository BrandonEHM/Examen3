router.post('/', (req, res) => {
    const { username, password, name } = req.body;
    guardarUsuario(username, password, name);
    res.send('Usuario agregado correctamente');
  });
  
  module.exports = router;
  