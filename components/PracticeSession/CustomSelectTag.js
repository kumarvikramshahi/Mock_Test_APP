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
    deleteIcon,
    crossIcon,
    downloadPaper,
    deletePaper,
    listItemLoader
}) => {
    const colorScheme = useColorScheme();
    const styles2 = StyleSheet.create({
        theme: {
            color: Colors[colorScheme].text,
            backgroundColor: Colors[colorScheme].background,
            shadowColor: Colors[colorScheme].text
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
                                <View key={idx}
                                    style={selectedValue === item._id ? [styles.cardItem, styles2.theme, styles2.selectedValue,] : [styles.cardItem, styles2.theme]}
                                >
                                    <TouchableOpacity activeOpacity={0.7}
                                        style={[styles.Text, { flex: 3, borderColor: colorScheme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }]}
                                        onPress={() => textClickHandler(item._id, item.name, item.is_Downloaded)}
                                    >
                                        <Text style={[{ color: Colors[colorScheme].text }, styles.textChilds]}>{item.name}</Text>
                                    </TouchableOpacity>
                                    {icon1 || icon2 ? (
                                        item.is_Downloaded ? (
                                            <View style={{ flex: 2, flexDirection: "row" }}>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={[styles.textChilds, styles.icons]}> {icon1}</Text>
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    {listItemLoader?.value && (listItemLoader?.id === item._id) ?
                                                        <Text style={[styles.textChilds, styles.icons]}> <ActivityIndicator size={20} /></Text>
                                                        : (
                                                            <Text style={[styles.textChilds, styles.icons]} onPress={() => deletePaper(item._id)}>
                                                                {deleteIcon}
                                                            </Text>
                                                        )
                                                    }
                                                </View>
                                            </View>
                                        ) : (listItemLoader?.value && (listItemLoader?.id === item._id) ?
                                            <View style={{ flex: 2 }}>
                                                <Text style={[styles.textChilds]}> <ActivityIndicator size={20} /></Text>
                                            </View>
                                            : (
                                                <Text style={[{ flex: 2 }, styles.icons]} onPress={() => downloadPaper(item._id)}>
                                                    {icon2}
                                                </Text>
                                            )
                                        )
                                    ) : null}
                                </View>
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
    cardItem: {
        flexDirection: "row",
        margin: 1,
        elevation: 20,
        borderRadius: 50,
    },
    Text: {
        padding: 20,
        marginRight: 3,
        borderRightWidth: 1
    },
    modalView: {
        paddingVertical: 15,
        alignItems: "center",
    },
    textChilds: {
        alignItems: "center",
        fontSize: FontSize.small,
    },
    icons: {
        alignItems: "center"
    },
    crossIcon: {
        borderRadius: 50,
        padding: 4,
        elevation: 50,
        marginBottom: 12
    },
});

export default CustomSelectTag;