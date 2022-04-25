const gana_events = require('./gana/gana');

function init() {
    gana_events.init();
}

module.exports = {
    init: init
}