const { Router } = require('express');

const schemas = require('../../schemas/user');
const { validateBody } = require('../../decorators');
const { authenticate } = require('../../middlewares');
const authCtrl = require('../../controllers/users');

const router = Router();

module.exports = router;
