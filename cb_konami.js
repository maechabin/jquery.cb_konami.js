/*!
 * jquery.cb_konami.js v0.9
 * Auther @maechabin
 * Licensed under mit license
 */

;(function ($, window, document, undefined) {

    var Konami = function (element, callback) {

        this.element = element;
        this.command = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        this.key_array = [];
        this.key_count = 0;
        this.callback = (callback) ? callback : function () {alert("Hello Konami.")};

    };

    Konami.prototype.keyDown = function (event) {

        var i, c;
        var key = event.keyCode;

        this.key_array.push(key);
        i = this.key_array.length - 1;
        c = this.command.length;

        if (this.key_array[i] === this.command[i]) {

            this.key_count++;

        } else {

            this.reset();

        }

        //console.log(this.key_array);
        //console.log(this.key_count);

        if (this.key_count === c) {

            this.action(this.callback);

        }

    };

    Konami.prototype.action = function (callback) {

        callback();
        this.resetKey();

    };

    Konami.prototype.reset = function () {

        this.key_array = [];
        this.key_count = 0;

    };

    Konami.prototype.init = function () {

        var d = this.element;
        var that = this;

        try {

            d.addEventListener("keydown", function (event) {

                that.keyDown.call(that, event);

            }, false);

        } catch (error) {

            d.attachEvent("keydown", function (event) {

                that.keyDown.call(that, event);

            });

        }

        return this;

    };

    $.fn.cb_konami = function (callback) {

        return this.each(function () {

            new Konami(this, callback).init();

        });

    };

})(jQuery, window, document);