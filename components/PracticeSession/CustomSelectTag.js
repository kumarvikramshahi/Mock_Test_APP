import React, { useState } from "react";
import { Modal, StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { FontSize } from "../../constants/constants";
import useColorScheme from "../../hooks/useColorScheme";

const CustomSelectTag = ({
    list,
    selectedValue,
    setSelectedValue,
    setSelectTagOn,
    selectTagOn,
    textClickHandler,
    icon1,
    icon2,
    crossIcon,
    downloadPaper,
    listItemLoader
}) => {
    const colorScheme = useColorScheme();
    const styles2 = StyleSheet.create({
        theme: {
            color: Colors[colorScheme].text,
            backgroundColor: Colors[colorScheme].background,
            shadowColor: Colors[colorScheme].text
        },
        Text: {
            padding: 20,
            textAlign: "center",
            flexDirection: "row",
            borderRadius: 50,
            margin: 1,
            elevation: 20,
        },
        selectedValue: {
            borderWidth: 4,
            borderColor: colorScheme === "light" ? "rgba(0,0,0,1)" : "rgba(255,255,255,1)",
        }
    });

    return (
        <ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={selectTagOn}
                onRequestClose={() => {
                    setSelectTagOn(!selectTagOn);
                }}
            >
                <View style={styles.centeredView}>
                    <Text style={[styles.crossIcon, styles2.theme]} onPress={() => setSelectTagOn(!selectTagOn)}>
                        {crossIcon}
                    </Text>
                    <View style={[styles.modalView]}>
                        {list?.length ? list?.map((item, idx) => {
                            return (
                                <TouchableOpacity key={idx} activeOpacity={0.7}
                                    style={selectedValue === item._id ? [styles2.Text, styles2.selectedValue, styles2.theme] : [styles2.Text, styles2.theme]}
                                >
                                    <Text style={{ flex: 4, ...styles.textChilds, ...styles2.theme }}
                                        onPress={() => textClickHandler(item._id, item.name, item.is_Downloaded)}
                                    >
                                        {item.name}
                                    </Text>
                                    {icon1 || icon2 ? (
                                        item.is_Downloaded ?
                                            <Text style={{ flex: 1, ...styles.textChilds }}> {icon1}</Text>
                                            : <Text style={{ flex: 1, ...styles.textChilds }} onPress={() => downloadPaper(item._id)} > {listItemLoader?.value && (listItemLoader?.id === item._id) ? <ActivityIndicator size={20} /> : icon2}</Text>
                                    ) : null}
                                </TouchableOpacity>
                            )
                        }) : null}
                    </View>
                </View>
            </Modal>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20
    },
    modalView: {
        borderRadius: 20,
        paddingVertical: 15,
        alignItems: "center",
    },
    textChilds: {
        alignItems: "center",
        fontSize: FontSize.small,
    },
    crossIcon: {
        borderRadius: 50,
        padding: 4,
        elevation: 50,
        marginBottom: 12
    },
});

export default CustomSelectTag;