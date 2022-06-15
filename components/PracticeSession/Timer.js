// Example of React Native Timer and Stopwatch
// https://aboutreact.com/react-native-timer-stopwatch/

// import React in our code
import React, { useState } from 'react';

// import all the components we are going to use
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

//importing library to use Stopwatch and Timer
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

const App = () => {
    const [isTimerStart, setIsTimerStart] = useState(false);
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [timerDuration, setTimerDuration] = useState(90000);
    const [resetTimer, setResetTimer] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Example of React Native Timer and Stopwatch
                </Text>
                <View style={styles.sectionStyle}>
                    <Stopwatch
                        laps
                        msecs
                        start={isStopwatchStart}
                        //To start
                        reset={resetStopwatch}
                        //To reset
                        options={options}
                        //options for the styling
                        getTime={(time) => {
                            console.log(time);
                        }}
                    />
                    <TouchableHighlight
                        onPress={() => {
                            setIsStopwatchStart(!isStopwatchStart);
                            setResetStopwatch(false);
                        }}>
                        <Text style={styles.buttonText}>
                            {!isStopwatchStart ? 'START' : 'STOP'}
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => {
                            setIsStopwatchStart(false);
                            setResetStopwatch(true);
                        }}>
                        <Text style={styles.buttonText}>RESET</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.sectionStyle}>
                    <Timer
                        totalDuration={timerDuration}
                        msecs
                        //Time Duration
                        start={isTimerStart}
                        //To start
                        reset={resetTimer}
                        //To reset
                        options={options}
                        //options for the styling
                        handleFinish={() => {
                            alert('Custom Completion Function');
                        }}
                        //can call a function On finish of the time
                        getTime={(time) => {
                            console.log(time);
                        }}
                    />
                    <TouchableHighlight
                        onPress={() => {
                            setIsTimerStart(!isTimerStart);
                            setResetTimer(false);
                        }}>
                        <Text style={styles.buttonText}>
                            {!isTimerStart ? 'START' : 'STOP'}
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => {
                            setIsTimerStart(false);
                            setResetTimer(true);
                        }}>
                        <Text style={styles.buttonText}>RESET</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    },
    sectionStyle: {
        flex: 1,
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        marginTop: 10,
    },
});

const options = {
    container: {
        backgroundColor: '#FF0000',
        padding: 5,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        color: '#FFF',
        marginLeft: 7,
    },
};
