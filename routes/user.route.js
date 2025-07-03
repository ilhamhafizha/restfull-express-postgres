const express = require('express');
const router = express.Router();

const validate = require('../middlewares/todos.validate');
const { registerSchema, loginSchema } = require('../validators/todo.validator');
const userHandler = require('../handlers/user.handler');

router.post('/register', validate(registerSchema), userHandler.register);
router.post('/login', validate(loginSchema), userHandler.login);

module.exports = router;
