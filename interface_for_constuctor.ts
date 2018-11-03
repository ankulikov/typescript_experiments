/**
 TypeScript allows to create interface to define class constructor(s) (see 'ClockConstructor').
 Pros:
 * You can create object without information about its actual type: constructor signature is enough (see 'createClock')
 Cons:
 * Class can't implement such interface because it is static part of class
      (as a result, constructors in AbstractClock aren't checked against ClockConstructor)
 * Pitfalls in constructor overloading (multiple constructor)
 */

interface ClockConstructor {
    new(hour: number, minute: number): ClockInterface;
    new(hour: number, minute: number, seconds: number): ClockInterface;
}

interface ClockInterface {
    tick();
}

abstract class AbstractClock implements ClockInterface /*, ClockConstructor //no, you can't */  {
    protected hours: number;
    protected minutes: number;
    protected seconds: number;

    public constructor(hours: number, minutes: number, seconds: number);
    public constructor(hours: number, minutes: number);
    //only one constructor can have implementation, others just call this one
    constructor(...args: any[]) {
        this.hours = args[0];
        this.minutes = args[1];
        if (args.length > 2) {
            this.seconds = args[2];
        }
    }

    abstract tick();
}

//acts like a factory method
function createClock(ctor: ClockConstructor, hour: number, minute: number, seconds: number = 0): ClockInterface {
    //WebStorm shows hints for overloading (with 2 and 3 arguments)
    return seconds === 0 ?
        new ctor(hour, minute) :
        new ctor(hour, minute, seconds);
}

class DigitalClock extends AbstractClock {
    tick() {
        console.log("beep beep");
    }
}

class AnalogClock implements ClockInterface {
    tick() {
        console.log("tick tock");
    }
}

class AtomicClock extends AbstractClock {
    tick() {
        console.log("baduu boom");
    }

    constructor(hours: number, minutes: number) {
        super(hours, minutes);
        console.log("Atomic clock was created");
    }

    //Error: TS2392: Multiple constructor implementations are not allowed.
    // constructor(hours: number, minutes: number, seconds: number) {}
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
let atomic = createClock(AtomicClock, 10, 20, 30);