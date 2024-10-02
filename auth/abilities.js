// abilities.js
const { AbilityBuilder, Ability } = require('@casl/ability');

function defineAbilitiesFor(user) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user.role === 'admin') {
    can('manage', 'all'); // Admin can perform any action on any resource
  } else if (user.role === 'moderator') {
    can(['read', 'update', 'delete'], 'Article'); // Moderator can read, update, delete any article
    cannot('create', 'Article'); // Moderator cannot create articles
  } else if (user.role === 'user') {
    can(['create', 'read'], 'Article'); // Users can create and read articles
    can(['update', 'delete'], 'Article', { authorId: user.id }); // Users can update/delete their own articles
    cannot('delete', 'Article', { isPublished: true }); // Users cannot delete published articles
  } else {
    can('read', 'Article'); // Guests can read articles
  }

  return build();
}

module.exports = defineAbilitiesFor;
