import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { DefaultText, DefaultView } from "../../components/UI/Themed";
import Crousel from "../../components/Crousel/Crousel";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import PractiseLineChart from "../../components/Charts/Practise/LineChart";

export default function Home() {
    const colorScheme = useColorScheme();

    return (
        <ScrollView>
            <Crousel imgUri={imgArry} />
            <View style={styles.practiseCard}>
                <PractiseLineChart inputData={practData} />
            </View>
            <View style={styles.practiseCard}>
                <PractiseLineChart inputData={compData} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    practiseCard: {
        borderRadius: 20,
        shadowColor: "rgba(0,0,0,0.2)",
        width: "100%",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
});

const practData = [110, 221, 223, 34, 333, 22, 33, 44, 5, 66]
const compData = [22, 33, 3, 53, 234, 534, 65, 65, 656, 566]

const imgArry = [
    "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/TNC_PC2021_450b6776aee8195158c113bac7b342a0-original.jpg?crop=0,26,4000,2200&wid=4000&hei=2200&scl=1.0",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1200px-Shaqi_jrvej.jpg",
    "https://th-thumbnailer.cdn-si-edu.com/vSnitgUqCQCRSx7mkHZtHZHry4U=/1072x720/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/04/8e/048ed839-a581-48af-a0ae-fac6fec00948/gettyimages-168346757_web.jpg",
    "https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg",
    "https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2019/07/23090714/nature-1024x682.jpeg"
]