import React, { useState } from "react";
import { Text, View, Modal, TextInput, StyleSheet } from "react-native";;
import { DefaultText, DefaultView } from "../UI/Themed";
import CustomButton from "../UI/CustomButton";

export default function ErrorReport({ assosiatedWith, reportModalOn, setReportModalOn }) {
    const [textInput, setTextInput] = useState('');

    const onSubmit = () => {
        setReportModalOn(!reportModalOn);

    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={reportModalOn}
            onRequestClose={() => {
                setReportModalOn(!reportModalOn);
            }}
        >
            <DefaultView>
                <TextInput
                    style={styles.input}
                    onChangeText={setTextInput}
                    value={textInput}
                    multiline={true}
                />
                <CustomButton value={"Submit"}
                    onPress={onSubmit}
                    bgcolor="rgba(191, 6, 98,1)"
                    color="rgba(255,255,255,0.9)"
                    padding={8}
                    margin={10}
                />
            </DefaultView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 500,
        maxWidth: "80%"
    }
})