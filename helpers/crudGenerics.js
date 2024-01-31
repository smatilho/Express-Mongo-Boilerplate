function getAll(Model) {
    return (req, res, next) => {
        Model.find()
            .then((docs) => res.success(docs))
            .catch((err) => next(err));
    };
}

function getOneByKey(Model, keyName) {
    return (req, res, next) => {
        const keyValue = req.params[keyName];
        const query = {};
        query[keyName] = keyValue;

        Model.findOne(query)
            .then((doc) => {
                if (!doc) {
                    return res.notFound(`Document with ${keyName} '${keyValue}' not found`);
                }
                res.success(doc);
            })
            .catch((err) => next(err));
    };
}

function post(Model) {
    return (req, res, next) => {
        const { data } = req.body;

        Model.create(data)
            .then((doc) => res.success(doc))
            .catch((err) => next(err));
    };
}

function putOne(Model, keyName) {
    return (req, res, next) => {
        const keyValue = req.params[keyName];
        const query = {};
        query[keyName] = keyValue;

        const updateData = req.body.data;

        Model.findOneAndUpdate(query, updateData, { new: true })
            .then((doc) => {
                if (!doc) {
                    return res.notFound(`Document with ${keyName} '${keyValue}' not found`);
                }
                res.success(doc);
            })
            .catch((err) => next(err));
    };
}

function deleteOne(Model, keyName) {
    return (req, res, next) => {
        const keyValue = req.params[keyName];
        const query = {};
        query[keyName] = keyValue;

        Model.findOneAndDelete(query)
            .then((doc) => {
                if (!doc) {
                    return res.notFound(`Document with ${keyName} '${keyValue}' not found`);
                }
                res.success(doc);
            })
            .catch((err) => next(err));
    };
}

module.exports = {
    getAll, getOneByKey, post, putOne, deleteOne,
};
