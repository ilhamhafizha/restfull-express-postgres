const express = require('express');
const router = express.Router();

const validate = require('../middlewares/todos.validate');
const { registerSchema, loginSchema } = require('../validators/todo.validator');
const handler = require('../handlers/user.handler');

router.post('/register', validate(registerSchema), handler.register);
router.post('/login', validate(loginSchema), handler.login);

module.exports = router;
