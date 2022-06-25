import React, { useState, useRef, useEffect } from 'react'
import { View } from 'react-native';
import { DefaultText } from '../UI/Themed';
import { FontSize } from '../../constants/constants';

const CountdownTimer = ({ passedNavigation, startCountdownTimer, timeLimit, paramsObj }) => {
    const [useEffectCleanUp, setUseEffectCleanUp] = useState(false);
    const [timer, setTimer] = useState(null);
    // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
    const Ref = useRef(null);

    // getting remainig time
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let { total, hours, minutes, seconds }
            = getTimeRemaining(e);
        if (total >= 0) {

            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }


    const clearTimer = (e) => {

        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next
        setTimer((timeLimit.hours > 9 ? timeLimit.hours : '0' + timeLimit.hours) + ":" + (timeLimit.minutes > 9 ? timeLimit.minutes : "0" + timeLimit.minutes) + ":00");

        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();

        // This is where you need to adjust if 
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + (timeLimit.hours * 60 * 60 + timeLimit.minutes * 60));
        return deadline;
    }

    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible

    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button

    useEffect(() => {
        if (timer === "00:00:00")
            passedNavigation.replace('Evaluation', { paramsObj: JSON.stringify(paramsObj) });

    }, [timer])

    useEffect(() => {
        if (startCountdownTimer)
            clearTimer(getDeadTime());

        return () => setUseEffectCleanUp({})
    }, [startCountdownTimer])

    return (
        <View>
            <DefaultText style={{ fontSize: FontSize.large }}>{timer}</DefaultText>
        </View>
    )
}

export default CountdownTimer;
