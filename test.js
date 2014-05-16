var React = require('react');
var d = React.DOM;
var tc = require('react-topcoat');
var hamburgerBasement = require('./hamburger-basement');

var basement = React.createClass({
    render: function() {
        return tc.list(
            { header: 'Header' },
            d.li(null, '1'),
            d.li(null, '2'),
            d.li(null, '3'),
            d.li(null, '4'),
            d.li(null, '5'),
            d.li(null, '6'),
            d.li(null, '7'),
            d.li(null, '8'),
            d.li(null, '9'),
            d.li(null, '10'),
            d.li(null, '11'),
            d.li(null, '12'),
            d.li(null, '13'),
            d.li(null, '14'),
            d.li(null, '15'),
            d.li(null, '16')
        );
    }
});

var content = React.createClass({
    render: function() {
        return d.div(
            null,
            'Hello'
        );
    }
});


var hb = hamburgerBasement({
    basement: basement(),
    title: 'Testing testing'
}, content());

React.initializeTouchEvents(true);
React.renderComponent(hb, document.getElementById('main'));
