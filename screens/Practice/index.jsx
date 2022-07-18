import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text, RefreshControl } from "react-native";
import { CheckIcon, Select, FormControl, Center, } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../../constants/Colors";
import { idealTutorApi, SELECTED_ITEM_STYLE } from "../../constants/constants";
import useColorScheme from "../../hooks/useColorScheme";
import CustomButton from "../../components/UI/CustomButton";
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
// import PaperListCard from "../../components/PracticeSession/PaperListCard";
import CustomSelectTag from "../../components/PracticeSession/CustomSelectTag";
import FullScreenSpinner from "../../components/UI/FullScreenSpinner";
import CustomToast from "../../components/UI/CustomToast";


export default function Practise({ navigation }) {
    const [useEffectCleanUp, setUseEffectCleanUp] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [examType, setExamType] = useState('');
    const [paperList, setPaperList] = useState([]);
    const [loading, setLoader] = useState(false);
    const [paperId, setPaperId] = useState('');
    const [selectedPaperName, setselectedPaperName] = useState('');
    // const [paperDetail, setPaperDetail] = useState(null);
    const [listItemLoader, setListItemLoader] = useState({ value: false, id: '' });
    const [modalVisible, setModalVisible] = useState(false); // for PopUps
    const [cardOn, setCardOn] = useState(false); //
    const [selectTagOn, setSelectTagOn] = useState(false);
    // const [isPaperDownloaded, setIsPaperDownloaded] = useState(false);
    const [asyncKeys, setAsyncKeys] = useState([]);


    // const { height, width } = useWindowDimensions();
    const colorScheme = useColorScheme();
    // const toast = useToast();

    const styles2 = StyleSheet.create({
        theme: {
            color: Colors[colorScheme].text,
            backgroundColor: Colors[colorScheme].background,
            fontSize: 25,
            shadowColor: Colors[colorScheme].text
        },
        tickIcon: {
            maxWidth: 25,
            height: 25,
            borderRadius: 50,
            backgroundColor: Colors[colorScheme].text,
            marginRight: 10
        }
        // screenWidth: {
        //     width: width
        // },
        // sreenHeight: {
        //     height: height
        // }
    });

    // const CustomToast = (message, position, color) => {
    //     toast.show({
    //         render: () => {
    //             return <Box bg={color ? color : "#fac2be"} px="2" py="1" rounded="md" mb={50}>
    //                 {message}
    //             </Box>;
    //         },
    //         placement: position ? position : "top"
    //     });
    // }

    const onRefresh = () => {
        setRefreshing(true);
        setExamType(''); setPaperList([]); setLoader(false); setPaperId('');
        setselectedPaperName(''); setListItemLoader({ value: false, id: '' });
        setModalVisible(false); setCardOn(false); setSelectTagOn(false);
        setRefreshing(false);
    }

    const downloadPaper = (id) => {
        setListItemLoader({ value: true, id: id })
        fetch(idealTutorApi + `/practice_paper/fetch/?paper_id=${id}`)
            .then(data => data.json())
            .then(async (jsonData) => {
                if (jsonData?.data) {
                    try {
                        for (let item of paperList) {
                            if (item._id === jsonData.data._id)
                                item['is_Downloaded'] = true
                        }

                        var arrangedQuestionlist = [];
                        var arrangedSubjectlist = [];
                        let subjectListLen = jsonData.data.subjects?.length;
                        let questionListLen = jsonData.data.questions?.length;
                        let questionList = jsonData.data.questions;
                        let subjectList = jsonData.data.subjects;
                        for (let i = 0; i < subjectListLen; i++) {
                            for (let j = 0; j < questionListLen; j++) {
                                if (questionList[j].subject === subjectList[i]) {
                                    arrangedQuestionlist.push(questionList[j]);
                                    if (!arrangedSubjectlist[i]) {
                                        arrangedSubjectlist.push({
                                            firstIdx: arrangedQuestionlist.length - 1,
                                            subject: subjectList[i]
                                        });
                                    }
                                }
                            }
                        }
                        jsonData.data.questions = arrangedQuestionlist;
                        jsonData.data.subjects = arrangedSubjectlist;

                        setAsyncKeys([...asyncKeys, `@paper_${jsonData.data._id}`])
                        await AsyncStorage.setItem(`@paper_${jsonData.data._id}`, JSON.stringify(jsonData.data))
                    } catch (err) {
                        CustomToast(err.message)
                    }
                    setListItemLoader({ value: false, id: id })
                } else CustomToast(jsonData.message);
            })
            .catch(err => {
                setListItemLoader({ value: false, id: id })
                CustomToast(err.message)
            })
    }

    const deletePaper = async (id) => {
        try {
            setListItemLoader({ value: true, id: id })
            await AsyncStorage.removeItem("@paper_" + id)
            let keys = asyncKeys;
            for (let item of paperList) {
                if (item._id === id)
                    item['is_Downloaded'] = false
            }
            for (let i = 0; i < keys.length; i++) {
                if (keys[i] === "@paper_" + id) {
                    keys.splice(i, 1);
                    break;
                }
            }
            setAsyncKeys(keys);
            setListItemLoader({ value: false, id: id })
        } catch (err) {
            setListItemLoader({ value: false, id: id })
            CustomToast(err.message)
        }
    }

    const onPaperSelect = (id, name, isDownloaded) => {
        if (!listItemLoader.value && isDownloaded) {
            setSelectTagOn(false)
            setPaperId(id)
            setselectedPaperName(name);
        } else CustomToast("Download file to proceed further")
    }

    const startPractise = (e) => {
        if (examType && paperId)
            navigation.navigate('Instructions', { paperId: "@paper_" + paperId })
        else {
            if (examType && !paperId)
                CustomToast("Choose Paper :)")
            else {
                CustomToast("Choose Exam Type :)")
            }
        }
    }

    useEffect(() => {
        const loadAsyncKeys = async () => {
            try {
                setLoader(true)
                const keys = await AsyncStorage.getAllKeys();
                setAsyncKeys(keys)
                setLoader(false)
            } catch (e) {
                setLoader(false)
                CustomToast(e.message)
            }
        }
        loadAsyncKeys();

        return () => setUseEffectCleanUp(!useEffectCleanUp);
    }, [refreshing])

    useEffect(() => {
        if (examType) {
            setLoader(true);
            fetch(idealTutorApi + `/practice_paper/fetch/?exam_type=${examType.toLowerCase()}`)
                .then(data => data.json())
                .then(jsonData => {
                    if (jsonData?.data) {
                        let jsonDataObj = jsonData.data;
                        const len = jsonDataObj.length;
                        for (let item of asyncKeys) {
                            for (let i = 0; i < len; i++) {
                                if (item === "@paper_" + jsonDataObj[i]._id) {
                                    jsonDataObj[i]['is_Downloaded'] = true;
                                }
                            }
                        }
                        setPaperList(jsonDataObj)
                    } else {
                        setPaperList([])
                        setselectedPaperName('');
                        CustomToast(jsonData.message)
                    }
                    setLoader(false)
                })
                .catch(err => {
                    setLoader(false)
                    CustomToast(err.message)
                })
        }

        return () => setUseEffectCleanUp(!useEffectCleanUp);
    }, [examType])

    useEffect(() => {
        if (paperList.length && examType) setSelectTagOn(true);
        else setSelectTagOn(false)
    }, [examType, paperList.length, cardOn])

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            {loading ? <FullScreenSpinner /> : null}
            <Center>
                <View style={{ ...styles.card, ...styles2.theme }}>
                    <Center>
                        <FormControl maxW="90%" >
                            <FormControl.Label>Choose Exam Type</FormControl.Label>
                            <Select accessibilityLabel="Choose Exam" placeholder="Choose Exam"
                                style={styles2.theme}
                                _selectedItem={{
                                    ...SELECTED_ITEM_STYLE,
                                    endIcon: <CheckIcon size="5" />,
                                }} mt={1}
                                onValueChange={itemValue => { setCardOn(!cardOn); setExamType(itemValue); }}
                                selectedValue={examType}
                            >
                                {examList.map((item, idx) => <Select.Item key={idx} color={Colors[colorScheme].text} label={item} value={item.toLowerCase()} />)}
                            </Select>
                            {selectedPaperName ? (
                                <View style={styles.selectedPaperName}>
                                    <View style={{ flex: 0.18, ...styles2.tickIcon }}>
                                        <MaterialIcons name="done" size={24} color={Colors[colorScheme].background} />
                                    </View>
                                    <View style={{ flex: 2 }}>
                                        <Text style={{ color: Colors[colorScheme].text }}>
                                            {selectedPaperName}
                                        </Text>
                                    </View>
                                </View>
                            ) : null}

                            {/* Paper List */}
                            <CustomSelectTag
                                list={paperList}
                                selectedValue={paperId}
                                selectTagOn={selectTagOn}
                                setSelectTagOn={setSelectTagOn}
                                textClickHandler={onPaperSelect}
                                icon1={<MaterialIcons name="file-download-done" size={24} color={Colors[colorScheme].text} />}
                                icon2={<FontAwesome name="cloud-download" size={24} color={Colors[colorScheme].text} />}
                                deleteIcon={<MaterialIcons name="delete" size={24} color={Colors[colorScheme].text} />}
                                crossIcon={<Entypo name="cross" size={32} color={Colors[colorScheme].text} />}
                                downloadPaper={downloadPaper}
                                deletePaper={deletePaper}
                                listItemLoader={listItemLoader}
                            />
                        </FormControl>
                    </Center>
                </View>
                <CustomButton value="Start practise" onPress={startPractise} fontSize={18} />
            </Center>
        </ScrollView >
    )
}

const examList = ["jee", "ssc", 'railway', 'upsc', 'bpsc'];

const styles = StyleSheet.create({
    label: {
        marginTop: 15
    },
    card: {
        marginTop: 20,
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
        paddingBottom: 40,
        width: "95%",
        elevation: 20,
    },
    PaperListCard: {
        backgroundColor: "rgba(0,0,0,0.2)"
    },
    selectedPaperName: {
        marginTop: 20,
        marginHorizontal: 20,
        flexDirection: "row",
    },
});