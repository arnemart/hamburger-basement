/*global define*/
(function(root) {
    function init(React, tc) {
        React = React || root.React;
        tc = tc || root.ReactTopcoat;
        var d = React.DOM;

        // Header component
        var topbar = React.createClass({
            toggle: function() {
                this.props.toggle();
            },
            render: function() {
                return d.div(
                    { className: 'hamburger-basement-topbar'},
                    tc.navigationBar({
                        title: this.props.title,
                        leftButton: tc.iconButton({
                            type: 'quiet',
                            onClick: this.toggle,
                            which: 'menu-stack'
                        })
                    })
                );
            }
        });

        return React.createClass({
            getDefaultProps: function() {
                return {
                    basement: d.div(null, 'I am basement'),
                    content: d.div(null, 'I am content'),
                    animationDuration: 0.4,
                    basementWidth: 0, // 0 = set automatically
                    toggleDistanceDelta: 50,
                    openOffset: 85
                };
            },
            getInitialState: function() {
                return {
                    open: false, // Is the basement currently open?
                    position: 0, // Position of the overlay
                    touching: false, // Is touch interaction currently happening?
                    currentBasementWidth: 0, // Current width of basement element, will be set after rendering and on resize
                    touchOrigin: 0, // X position of last touchstart-event
                    originalPosition: 0 // Original overlay position before touch started
                };
            },
            // Toggle open/closed
            toggle: function() {
                this.setState({ open: !this.state.open });
            },
            touchStart: function(e) {
                this.setState({
                    touching: true,
                    touchOrigin: e.targetTouches[0].clientX,
                    originalPosition: this.state.position
                });
            },
            touchMove: function(e) {
                if (this.state.touching) {
                    var newPos = Math.max(0, this.state.originalPosition + (e.targetTouches[0].clientX - this.state.touchOrigin));
                    this.setState({
                        position: newPos
                    });
                }
            },
            touchEnd: function() {
                if (this.state.touching) {
                    var shouldToggle = Math.abs(this.state.originalPosition - this.state.position) > this.props.toggleDistanceDelta;
                    if (shouldToggle) {
                        this.setState({
                            touching: false,
                            open: !this.state.open
                        });
                    } else {
                        this.setState({
                            touching: false,
                            position: this.state.originalPosition
                        });
                    }
                }
            },
            // Calculate overlay position when the basement is open
            openPosition: function() {
                if (this.basementWidth > 0) {
                    return this.props.basementWidth - this.props.openOffset;
                } else {
                    return this.state.currentBasementWidth - this.props.openOffset;
                }
            },
            resize: function() {
                this.setState({ currentBasementWidth: this.refs.basement.getDOMNode().offsetWidth });
                if (this.state.open) {
                    this.setState({ position: this.openPosition() });
                }
            },
            componentDidUpdate: function(prevProps, prevState) {
                // Check to see if we should toggle the overlay position
                if (prevState.open !== this.state.open) {
                    this.setState({ position: this.state.open ? this.openPosition() : 0 });
                }
            },
            componentDidMount: function() {
                // Make sure resizing the window is supported
                // This should also handle portrait/landscape switching on mobile
                window.addEventListener('resize', this.resize);
                this.setState({ currentBasementWidth: this.refs.basement.getDOMNode().offsetWidth });
            },
            componentWillUnmount: function() {
                window.removeEventListener('resize', this.resize);
            },
            render: function() {
                return d.div(
                    { className: 'hamburger-basement' },
                    d.div(
                        {
                            className: 'hamburger-basement-basement',
                            ref: 'basement'
                        },
                        this.props.basement
                    ),
                    d.div(
                        {
                            className: 'hamburger-basement-main',
                            style: {
                                '-webkit-transform': 'translate3d(' + this.state.position + 'px, 0, 0)',
                                '-moz-transform': 'translateX(' + this.state.position + 'px)',
                                '-o-transform': 'translateX(' + this.state.position + 'px)',
                                'transform': 'translateX(' + this.state.position + 'px)',
                                '-webkit-transition': (this.state.touching ? 'none' : '-webkit-transform ' + this.props.animationDuration + 's ease-out'),
                                '-moz-transition': (this.state.touching ? 'none' : '-moz-transform ' + this.props.animationDuration + 's ease-out'),
                                '-o-transition': (this.state.touching ? 'none' : '-o-transform ' + this.props.animationDuration + 's ease-out'),
                                'transition': (this.state.touching ? 'none' : 'transform ' + this.props.animationDuration + 's ease-out')
                            },
                            onTouchStart: this.touchStart,
                            onTouchMove: this.touchMove,
                            onTouchEnd: this.touchEnd,
                            onTouchCancel: this.touchEnd
                        },
                        topbar({
                            title: this.props.title,
                            toggle: this.toggle
                        }),
                        d.div(
                            { className: 'hamburger-basement-content'},
                            this.props.content
                        )
                    )
                );
            }
        });
    }

    // Exposify
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = init(require('react'), require('react-topcoat'));
    } else if (typeof define === 'function' && define.amd) {
        define(['react', 'react-topcoat'], function(React, ReactTopcoat) {
            return init(React, ReactTopcoat);
        });
    } else {
        root.ReactTopcoat = init();
    }
})(this);
