var React = require('react');
var d = React.DOM;
var tc = require('react-topcoat');
var hamburgerBasement = require('./hamburger-basement');

var basement = React.createClass({
    render: function() {
        return tc.list({
            header: 'Header',
            items: [{content: 'aa'}, {content: 'bb'}, {content: 'cc'}, {content: 'dd'}, {content: 'ee'}, {content: 'ff'}, {content: 'gg'}, {content: 'hh'}, {content: 'ii'}, {content: 'jj'}, {content: 'kk'}, {content: 'll'}, {content: 'mm'}, {content: 'nn'}, {content: 'oo'}, {content: 'pp'}, {content: 'qq'}]
        });
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
    title: 'Testing testing',
    content: content(),
    basementWidth: 400
});

React.initializeTouchEvents(true);
React.renderComponent(hb, document.getElementById('main'));
