import React from "react";
import { StyleSheet } from "react-native";
import { VictoryChart, VictoryTheme, VictoryLine, VictoryLabel } from "victory-native";

export default function PractiseLineChart({ inputData }) {
    const styles = StyleSheet.create({
        chart: {
        }
    });

    const dataLength = inputData.length;
    var data = [];
    for (let i = 0; i < dataLength; i++) {
        data.push({ x: i + 1, y: inputData[i] })
    }

    return (
        <VictoryChart
            theme={VictoryTheme.material}
            style={styles.chart}
            padding={{ top: 50, bottom: 50, left: 50, right: 50 }}
        >
            <VictoryLine
                style={{
                    data: { stroke: "#c43a31" },
                    parent: { border: "1px solid #ccc" }
                }}
                data={data}
            />
        </VictoryChart>
    );
}
