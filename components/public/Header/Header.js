import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { HStack } from "native-base";
import Logo from "./Logo";
import { Ionicons as NotificationsOutline } from '@expo/vector-icons';
import { Ionicons as NotificationsFilled } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Header() {
    const [notificationClicked, setNotificationClicked] = useState(false);

    const notificationBtnClicked = () => {
        setNotificationClicked(!notificationClicked)
    }

    return (
        <View style={styles.header}>
            <HStack>
                {/* Logo */}
                <Logo />

                {/* Notification and Profile */}
                <HStack marginRight={4} position="absolute" right={0} >
                    {notificationClicked ?
                        <NotificationsFilled name="ios-notifications" size={24} color="black" style={{ marginRight: 11 }} onPress={notificationBtnClicked} />
                        : <NotificationsOutline name="notifications-outline" size={24} color="black" style={{ marginRight: 11 }} onPress={notificationBtnClicked} />
                    }
                    <MaterialCommunityIcons name="face-profile" size={24} color="black" />
                </HStack>
            </HStack>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        position: "relative",
        top: 0,
        fontSize: 20,
        padding: 18,
        width: "100%",
    },
});