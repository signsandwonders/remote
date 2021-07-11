input.onButtonPressed(Button.A, function () {
    if (0 < SPEED) {
        SPEED += -25
    }
    basic.showString("" + (SPEED))
    basic.showString("% ")
})
function readLight () {
    led.plotBarGraph(
    input.lightLevel(),
    255
    )
}
input.onButtonPressed(Button.AB, function () {
	
})
input.onButtonPressed(Button.B, function () {
    if (100 > SPEED) {
        SPEED += 25
    }
    basic.showString("" + (SPEED))
    basic.showString("% ")
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
    } else if (name == "READTEMP") {
        readTempF()
    } else if (name == "READLIGHT") {
        readLight()
    } else {
        basic.showString("RADIO ERROR!")
        basic.showString(name)
    }
})
function readTempF () {
    basic.showNumber(32 + input.temperature() * 1.8)
    basic.showString("F")
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
basic.showString("" + (SPEED))
basic.showString("% ")
