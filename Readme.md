hamburger-basement
==================

A hamburger basement component for [React][1], using [Topcoat][2].

Wth
---

A “hamburger basement” is a common design pattern in mobile apps, where a button with an icon that kinda looks like a hamburger (typically in the top left corner) slides the main content aside and reveals a menu underneath.

This one also uses touch events to allow sliding the content to the side with a finger.

Demo
----

Go here: <http://arnemart.github.io/hamburger-basement/>

(Preferably on mobile)

Installation
------------

`npm install hamburger-basement` or just download hamburger-basement.js and hamburger-basement.css.

Loading
-------

With browserify: `var HamburgerBasement = require('hamburger-basement');`

With AMD (requires modules `react` and `react-topcoat`): `require(['hamburger-basement'], function(HamburgerBasement) { // Do stuff })`

…or just include in a script tag (after loading react.js and react-topcoat.js first).

Don't forget to include the Topcoat CSS and `hamburger-basement.css` in your HTML.

Enabling touch events
---------------------

Touch events are not enabled by default in React as of version 0.9.0. To activate touch events, add the following line before rendering any React components:

```javascript
React.initializeTouchEvents(true);
```

Using
-----

Do like this:

```javascript
var basement = React.createClass({
    render: function() {
        return tc.list({
            header: 'Header',
            items: [{content: 'aa'}, {content: 'bb'}, {content: 'cc'}, {content: 'dd'}]
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
```

Run `npm test` to build the test script and open the test html file.


[1]: http://facebook.github.io/react/
[2]: http://topcoat.io