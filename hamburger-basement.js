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
                    _translate: 0,
                    _animate: false,
                    _open: false
                };
            },
            enableAnimation: function() {
                clearTimeout(this.deactivateanimationTimeout);
                if (!this.props._animate) {
                    this.setProps({
                        _animate: true
                    });
                }
            },
            disableAnimation: function() {
                clearTimeout(this.deactivateanimationTimeout);
                if (this.props._animate) {
                    this.setProps({
                        _animate: false
                    });
                }
            },
            // Slide the overlay to a specific position
            slideTo: function(translate, params) {
                this.touching = false;
                this.enableAnimation();
                this.setProps({
                    _translate: translate,
                    _open: (params ? params.open : this.props._open)
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
                if (this.props._open) {
                    this.open();
                } else {
                    this.close();
                }
            },
            // Toggle open/closed
            toggle: function() {
                if (this.props._open) {
                    this.close();
                } else {
                    this.open();
                }
            },
            touchStart: function(e) {
                this.startingPosition = this.props._translate;
                this.startX = e.targetTouches[0].pageX;
                this.startY = e.targetTouches[0].pageY;
                this.disableAnimation();
            },
            touchMove: function(e) {
                this.touching = true;
                this.deltaX = e.targetTouches[0].pageX - this.startX;
                this.deltaY = e.targetTouches[0].pageY - this.startY;
                if (Math.abs(this.deltaX) > Math.abs(this.deltaY) * 3) {
                    e.preventDefault();
                    if (this.deltaX < 0 && !this.props._open) {
                        this.deltaX = 0;
                    }
                    this.setProps({
                        _translate: this.deltaX + this.startingPosition
                    });
                }
            },
            touchEnd: function() {
                if (this.touching) {
                    if (Math.abs(this.deltaX) > this.props.toggleDistanceDelta) {
                        this.toggle();
                    } else {
                        this.goBack();
                    }
                }
            },
            render: function() {
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
                                '-webkit-transform': 'translate3d(' + this.props._translate + 'px, 0, 0)',
                                '-moz-transform': 'translateX(' + this.props._translate + 'px)',
                                '-o-transform': 'translateX(' + this.props._translate + 'px)',
                                'transform': 'translateX(' + this.props._translate + 'px)',
                                '-webkit-transition': (this.props._animate ? '-webkit-transform ' + this.props.animationDuration + 's ease-out' : 'none'),
                                '-moz-transition': (this.props._animate ? '-moz-transform ' + this.props.animationDuration + 's ease-out' : 'none'),
                                '-o-transition': (this.props._animate ? '-o-transform ' + this.props.animationDuration + 's ease-out' : 'none'),
                                'transition': (this.props._animate ? 'transform ' + this.props.animationDuration + 's ease-out' : 'none')
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
