exports.getObjectById = (Object, uuid) => (req, res) => {
  const object = Object.findOne({ where: { uuid: uuid } })
    .then((obj) => {
      return obj;
    })
    .catch((err) => {
      res.status(404).send({ message: Object + ' not found' });
    });

  console.log('return object : ' + object);

  return object;
};

exports.changeObjectSettings = (Object, paramsToChange, id) => (req, res) => {
  Object.findOne({ where: { uuid: id } })
    .then((object) => {
      if (!object) return res.status(404).send({ message: 'Object not found' });
      var smthChanged = false;
      paramsToChange.forEach((paramName) => {
        if (
          req.body[paramName] !== undefined &&
          req.body[paramName] !== object[paramName]
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
