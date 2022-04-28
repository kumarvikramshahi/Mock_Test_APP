import React from "react";
import { View, Image, HStack, Text } from "native-base";
import Chips from "../../UI/Chips";

export default function DetailsCard({
    profilePic,
    name,
    numberOfStudentTaught,
    ratingStar,
    ratingCount,
    skills,
    experience,
    achievement,
    bookPrefrenceList
}) {
    return (
        <View paddingLeft={2} paddingRight={2}>
            <Image
                source={{
                    uri: profilePic,
                }}
                alt="Alternate Text"
                width={120}
                height={120}
                borderRadius={200}
            />
            <View>
                <Text>{name}</Text>
                <Text> Number of student taught: {numberOfStudentTaught} </Text>
                <Text> Max level of class teach: {skills.max_level_class_teach} </Text>
                <HStack>
                    <Text marginRight={3}>Subjects teach:</Text>
                    {skills.subject_teach.map((item, idx) => (
                        <Chips key={idx} skillSubjects={item} />
                    ))}
                </HStack>
                <Text> Experience: {experience} </Text>
                <Text> Achievement: {achievement} </Text>
                <Text> Book Prefrence List: {bookPrefrenceList} </Text>
                <Text>Rating Count: {ratingCount} </Text>
                <Text>Rating Star: {ratingStar} </Text>
            </View>
        </View>
    )
}