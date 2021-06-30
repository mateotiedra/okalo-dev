exports.changeObjectSettings = (Object, paramsToChange, id) => (req, res) => {
  Object.findByPk(id)
    .then((object) => {
      var smthChanged = false;
      paramsToChange.forEach((paramName) => {
        if (
          req.body[paramName] !== undefined &&
          req.body[paramName] != object[paramName]
        ) {
          object[paramName] = req.body[paramName];
          smthChanged = true;
        }
      });

      if (!smthChanged) {
        return res.status(304).send({ message: 'Nothing changed' });
      }
      object.save((err) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
      });
      res.status(200).send(object);
    })
    .catch((err) => {
      console.log(err);
    });
};
