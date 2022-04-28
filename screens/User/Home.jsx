import React from "react";
import { HStack, ScrollView } from "native-base";
import { DefaultText, DefaultView } from "../../components/Themed";
import Crousel from "../../components/Crousel/Crousel";

export default function Home() {
    return (
        <DefaultView>
            <Crousel imgUri={imgArry} />
        </DefaultView>
    )
}

const imgArry = [
    "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/TNC_PC2021_450b6776aee8195158c113bac7b342a0-original.jpg?crop=0,26,4000,2200&wid=4000&hei=2200&scl=1.0",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1200px-Shaqi_jrvej.jpg",
    "https://th-thumbnailer.cdn-si-edu.com/vSnitgUqCQCRSx7mkHZtHZHry4U=/1072x720/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/04/8e/048ed839-a581-48af-a0ae-fac6fec00948/gettyimages-168346757_web.jpg",
    "https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg",
    "https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2019/07/23090714/nature-1024x682.jpeg"
]