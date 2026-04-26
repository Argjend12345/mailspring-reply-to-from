const { ComponentRegistry } = require('mailspring-exports');
const ReplyToButton = require('./reply-to-button');

module.exports = {
  activate() {
    ComponentRegistry.register(ReplyToButton, {
      role: 'Composer:ActionButton',
    });
  },

  deactivate() {
    ComponentRegistry.unregister(ReplyToButton);
  },
};
