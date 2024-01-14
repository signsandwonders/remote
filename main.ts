input.onButtonPressed(Button.A, function () {
    decreaseSpeed()
})
function decreaseSpeed () {
    if (0 < SPEED) {
        SPEED += -25
    }
}
input.onButtonPressed(Button.B, function () {
    increaseSpeed()
})
radio.onReceivedValue(function (name, value) {
    if (name == "LEFT") {
        LEFT_MOTOR = value
        if (LEFT_MOTOR < 0) {
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Reverse, LEFT_MOTOR * SPEED)
        } else {
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, LEFT_MOTOR * SPEED)
        }
    } else if (name == "RIGHT") {
        RIGHT_MOTOR = value
        if (RIGHT_MOTOR < 0) {
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, RIGHT_MOTOR * SPEED)
        } else {
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, RIGHT_MOTOR * SPEED)
        }
    } else if (name == "MOTOR") {
        if (value == 1) {
            motobit.enable(MotorPower.On)
        } else {
            motobit.enable(MotorPower.Off)
        }
    } else if (name == "SERVO_R") {
        if (value == 1) {
            SERVO_RIGHT_POS = (SERVO_RIGHT_POS + 1) % 2
            if (SERVO_RIGHT_POS == 0) {
                pins.servoWritePin(AnalogPin.P16, 45)
            } else {
                pins.servoWritePin(AnalogPin.P16, 90)
            }
        }
    } else if (name == "SERVO_L") {
        if (value == 1) {
            SERVO_LEFT_POS = (SERVO_LEFT_POS + 1) % 2
            if (SERVO_LEFT_POS == 0) {
                pins.servoWritePin(AnalogPin.P15, 90)
            } else {
                pins.servoWritePin(AnalogPin.P15, 120)
            }
        }
    } else if (name == "SPEED") {
        if (value == 1) {
            increaseSpeed()
        } else {
            decreaseSpeed()
        }
    } else {
        basic.showString("RADIO ERROR!")
        basic.showString(name)
    }
})
function showSpeed () {
    if (SPEED == 25) {
        basic.showLeds(`
            . . . . .
            . . . . .
            # . . . .
            # # . . .
            # # # . .
            `)
    } else if (SPEED == 50) {
        basic.showLeds(`
            # . . . .
            # # . . .
            # # # . .
            # # # # .
            # # # # #
            `)
    } else if (SPEED == 75) {
        basic.showLeds(`
            # # # . .
            # # # # .
            # # # # #
            # # # # #
            # # # # #
            `)
    } else if (SPEED == 100) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # . # .
            . # # # .
            . . . . .
            `)
    }
}
function increaseSpeed () {
    if (100 > SPEED) {
        SPEED += 25
    }
}
let RIGHT_MOTOR = 0
let LEFT_MOTOR = 0
let SERVO_LEFT_POS = 0
let SERVO_RIGHT_POS = 0
let SPEED = 0
gatorEnvironment.beginEnvironment()
gatorUV.begin()
motobit.invert(Motor.Left, true)
motobit.invert(Motor.Right, true)
radio.setGroup(1)
motobit.enable(MotorPower.On)
SPEED = 50
SERVO_RIGHT_POS = 0
SERVO_LEFT_POS = 0
basic.forever(function () {
    showSpeed()
})
