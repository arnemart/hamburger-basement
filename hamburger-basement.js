/*global define*/
(function(root) {
    function init(React, tc) {
        React = React || root.React;
        tc = tc || root.ReactTopcoat;
        var d = React.DOM;

        return React.createClass({
            getDefaultProps: function() {
                return {
                    basement: d.div(null, 'I am basement'),
                    content: d.div(null, 'I am content'),
                    animationDuration: 0.4,
                    basementWidth: window.innerWidth,
                    toggleDistanceDelta: 50,
                    openOffset: 85,
                };
            },
            getInitialState: function() {
                return {
                    translate: 0,
                    startingPosition: 0,
                    touching: false,
                    animate: false,
                    open: false
                };
            },
            enableAnimation: function() {
                clearTimeout(this.deactivateanimationTimeout);
                if (!this.state.animate) {
                    this.setState({
                        animate: true
                    });
                }
            },
            disableAnimation: function() {
                clearTimeout(this.deactivateanimationTimeout);
                if (this.state.animate) {
                    this.setState({
                        animate: false
                    });
                }
            },
            // Slide the overlay to a specific position
            slideTo: function(translate, params) {
                this.enableAnimation();
                this.setState({
                    touching: false,
                    translate: translate,
                    open: (params ? params.open : this.state.open)
                });
                var self = this;
                this.deactivateanimationTimeout = setTimeout(function() {
                    self.disableAnimation();
                }, this.props.animationDuration * 1000);
            },
            open: function() {
                this.slideTo(this.props.basementWidth - this.props.openOffset, { open: true });
            },
            close: function() {
                this.slideTo(0, { open: false });
            },
            // Animate back to current open/closed state
            goBack: function() {
                if (this.state.open) {
                    this.open();
                } else {
                    this.close();
                }
            },
            // Toggle open/closed
            toggle: function() {
                if (this.state.open) {
                    this.close();
                } else {
                    this.open();
                }
            },
            touchStart: function(e) {
                this.setState({
                    startingPosition: this.state.translate,
                    startX: e.targetTouches[0].pageX,
                    startY: e.targetTouches[0].pageY
                });
                this.disableAnimation();
            },
            touchMove: function(e) {
                this.setState({
                    touching: true,
                    deltaX: e.targetTouches[0].pageX - this.state.startX,
                    deltaY: e.targetTouches[0].pageY - this.state.startY
                });
                if (Math.abs(this.state.deltaX) > Math.abs(this.state.deltaY) * 3) {
                    e.preventDefault();
                    if (this.state.deltaX < 0 && !this.state.open) {
                        this.deltaX = 0;
                    }
                    this.setState({
                        translate: this.state.deltaX + this.state.startingPosition
                    });
                }
            },
            touchEnd: function() {
                if (this.state.touching) {
                    if (Math.abs(this.state.deltaX) > this.props.toggleDistanceDelta) {
                        this.toggle();
                    } else {
                        this.goBack();
                    }
                }
            },
            render: function() {
                console.log('rendring');
                return d.div(
                    { className: 'hamburger-basement' },
                    d.div(
                        { className: 'hamburger-basement-basement' },
                        this.props.basement
                    ),
                    d.div(
                        {
                            className: 'hamburger-basement-main',
                            style: {
                                '-webkit-transform': 'translate3d(' + this.state.translate + 'px, 0, 0)',
                                '-moz-transform': 'translateX(' + this.state.translate + 'px)',
                                '-o-transform': 'translateX(' + this.state.translate + 'px)',
                                'transform': 'translateX(' + this.state.translate + 'px)',
                                '-webkit-transition': (this.state.animate ? '-webkit-transform ' + this.props.animationDuration + 's ease-out' : 'none'),
                                '-moz-transition': (this.state.animate ? '-moz-transform ' + this.props.animationDuration + 's ease-out' : 'none'),
                                '-o-transition': (this.state.animate ? '-o-transform ' + this.props.animationDuration + 's ease-out' : 'none'),
                                'transition': (this.state.animate ? 'transform ' + this.props.animationDuration + 's ease-out' : 'none')
                            },
                            onTouchStart: this.touchStart,
                            onTouchMove: this.touchMove,
                            onTouchEnd: this.touchEnd,
                            onTouchCancel: this.touchEnd
                        },
                        d.div(
                            { className: 'hamburger-basement-topbar'},
                            tc.navigationBar({
                                title: this.props.title,
                                leftButton: tc.iconButton({
                                    type: 'quiet',
                                    onClick: this.toggle,
                                    which: 'menu-stack'
                                })
                            })
                        ),
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
