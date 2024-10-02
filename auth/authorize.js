// authorize.js
const { ForbiddenError } = require('@casl/ability');
const defineAbilitiesFor = require('./abilities');

function authorize(action, subject) {
  return (req, res, next) => {
    const user = req.user || {}; // Assume req.user is populated by an authentication middleware
    console.log(`User: ${user} ${user.role} ${user.id} on ${subject} ${subject.authorId}`)
    const ability = defineAbilitiesFor(user);

    try {
      ForbiddenError.from(ability).throwUnlessCan(action, subject);
      next();
    } catch (error) {
      if (error instanceof ForbiddenError) {
        res.status(403).json({ error: 'Forbidden' });
      } else {
        next(error);
      }
    }
  };
}

module.exports = authorize;
