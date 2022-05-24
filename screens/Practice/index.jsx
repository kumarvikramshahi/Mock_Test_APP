import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { ScrollView, CheckIcon, Select, FormControl, WarningOutlineIcon, Center, View, Button } from "native-base";
// import Realm from "realm";
import Colors from "../../constants/Colors";
import { idealTutorApi } from "../../constants/constants";
import useColorScheme from "../../hooks/useColorScheme";
import PopUp from "../../components/UI/PopUp";
import CustomButton from "../../components/UI/CustomButton";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import PaperSchema from "../../Schemas/PaperList";
import PaperListCard from "../../components/PracticeSession/PaperListCard";

export default function Practise({ navigation }) {
    const [examType, setExamType] = useState('');
    const [paperList, setPaperList] = useState([]);
    const [loading, setLoader] = useState(false);
    const [paperId, setPaperId] = useState('');
    const [paperDetail, setPaperDetail] = useState(null);
    const [smallLoader, setSmallLoader] = useState(false);
    const [message, setMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false); // for PopUps
    const [realm, setRealm] = useState(null);
    const [cardOn, setCardOn] = useState(false)

    const colorScheme = useColorScheme();

    // <MaterialIcons name="file-download-done" size={24} color="black" />
    // <FontAwesome name="cloud-download" size={24} color="black" />

    const styles2 = StyleSheet.create({
        theme: {
            color: Colors[colorScheme].text,
            backgroundColor: Colors[colorScheme].background,
            fontSize: 25,
        },
    });

    const startPractise = (e) => {
        if (examType && (paperList.length))
            navigation.navigate('Instructions')
        else {
            setModalVisible(true)
            setMessage("Choose Exam Type and Paper both, to Start Practice :)")
        }
    }

    const isDownloaded = () => {
        if (realm && paperId) {
            console.log(paperId)
            const newTask = realm.objectForPrimaryKey("PaperList", paperId);
            console.log(newTask)
        } else console.log("no realm")
    }

    const onPaperSelect = async () => {
        console.log("hi")

    }

    // useEffect(async () => {
    //     const realmOpen = await Realm.open({
    //         schema: [PaperSchema],
    //     });
    //     console.log(realm)
    //     setRealm(realmOpen);
    // }, [])

    useEffect(() => {
        if (examType) {
            setLoader(true);
            fetch(idealTutorApi + `/practice_paper/fetch/?exam_type=${examType.toLowerCase()}`)
                .then(data => data.json())
                .then(jsonData => {
                    if (jsonData.data) setPaperList(jsonData.data);
                    else setMessage(jsonData.message);
                    setLoader(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoader(false)
                })
        }

        return setPaperList({})
    }, [examType])

    useEffect(() => {
        if (paperId) {
            setSmallLoader(true)
            fetch(idealTutorApi + `/practice_paper/fetch/?paper_id=${paperId}`)
                .then(data => data.json())
                .then(jsonData => {
                    if (jsonData.data) {
                        setPaperDetail(jsonData.data)
                        setSmallLoader(false)
                    } else setMessage(jsonData.message)
                })
                .catch(err => {
                    console.log(err)
                    setSmallLoader(false)
                })
        }

        return setPaperDetail({})
    }, [paperId])

    return (
        <ScrollView>
            <Center>
                <View style={{ ...styles.card, ...styles2.theme }}>
                    <Center>
                        <FormControl maxW="90%" >
                            <FormControl.Label>Choose Exam Type</FormControl.Label>
                            <Select accessibilityLabel="Choose Exam" placeholder="Choose Exam"
                                style={styles2.theme}
                                _selectedItem={{
                                    borderColor: "#079bb8",
                                    borderRadius: 20,
                                    borderWidth: 4,
                                    endIcon: <CheckIcon size="5" />,
                                }} mt={1}
                                onValueChange={itemValue => { setCardOn(true); setExamType(itemValue); }}
                            >
                                {examList.map((item, idx) => <Select.Item key={idx} color={Colors[colorScheme].text} label={item} value={item.toLowerCase()} />)}
                            </Select>
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                Please make a selection!
                            </FormControl.ErrorMessage>

                            {paperList.length ? (
                                <View accessible={true} onPress={() => setCardOn(!cardOn)} style={styles.PaperListCard} >
                                    <PaperListCard paperList={paperList} setPaperId={setPaperId} />
                                </View>
                            ) : null}
                        </FormControl>
                    </Center>
                </View>
                <CustomButton value="Start practise" btnHandler={startPractise} fontSize={18} />
                <PopUp message={message} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            </Center>
        </ScrollView >
    )
}

const examList = ["jee", "ssc", 'railway', 'upsc', 'bpsc'];

const styles = StyleSheet.create({
    label: {
        marginTop: 15
    },
    selectTag: {
    },
    card: {
        marginTop: 20,
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
        paddingBottom: 40,
        width: "95%",
        elevation: 10
    },
    PaperListCard: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.2)"
    }
});