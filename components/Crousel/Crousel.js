import React from "react";
import { Image, ScrollView } from "react-native";
import { HStack } from "native-base";
import { DefaultView } from "../Themed";

const Crousel = ({ imgUri }) => {
    return (
        <ScrollView width="100%" horizontal>
            <HStack>
                {imgUri.map((item, idx) =>
                    <Image
                        key={idx}
                        source={{
                            uri: item,
                        }}
                        alt="Alternate Text"
                        style={{
                            width: 400,
                            height: 200,
                            borderRadius: 10,
                            marginRight: 10,
                            marginLeft: 15
                        }}
                    />
                )}
            </HStack>
        </ScrollView>
    )
}

export default Crousel;