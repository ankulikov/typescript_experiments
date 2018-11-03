/**
 TypeScript allows to create interface to define class constructor(s) (see 'ClockConstructor').
 Pros:
 * You can create object without information about its actual type: constructor signature is enough (see 'createClock')
 Cons:
 * Class can't implement such interface because it is static part of class
      (as a result, constructors in AbstractClock aren't checked against ClockConstructor)
 * Pitfalls in constructor overloading (multiple constructor)
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AbstractClock = /** @class */ (function () {
    //only one constructor can have implementation, others just call this one
    function AbstractClock() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.hours = args[0];
        this.minutes = args[1];
        if (args.length > 2) {
            this.seconds = args[2];
        }
    }
    return AbstractClock;
}());
//acts like a factory method
function createClock(ctor, hour, minute, seconds) {
    if (seconds === void 0) { seconds = 0; }
    //WebStorm shows hints for overloading (with 2 and 3 arguments)
    return seconds === 0 ?
        new ctor(hour, minute) :
        new ctor(hour, minute, seconds);
}
var DigitalClock = /** @class */ (function (_super) {
    __extends(DigitalClock, _super);
    function DigitalClock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DigitalClock.prototype.tick = function () {
        console.log("beep beep");
    };
    return DigitalClock;
}(AbstractClock));
var AnalogClock = /** @class */ (function () {
    function AnalogClock() {
    }
    AnalogClock.prototype.tick = function () {
        console.log("tick tock");
    };
    return AnalogClock;
}());
var AtomicClock = /** @class */ (function (_super) {
    __extends(AtomicClock, _super);
    function AtomicClock(hours, minutes) {
        var _this = _super.call(this, hours, minutes) || this;
        console.log("Atomic clock was created");
        return _this;
    }
    AtomicClock.prototype.tick = function () {
        console.log("baduu boom");
    };
    return AtomicClock;
}(AbstractClock));
var digital = createClock(DigitalClock, 12, 17);
var analog = createClock(AnalogClock, 7, 32);
var atomic = createClock(AtomicClock, 10, 20, 30);
