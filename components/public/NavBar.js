import React from 'react';
import {
    Text,
    Icon,
    HStack,
    Center,
    Pressable,
} from 'native-base';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function NavBar() {
    const [selected, setSelected] = React.useState(0);

    return (
        <HStack bg="fuchsia.50" alignItems="center" safeAreaBottom shadow={6} borderTopWidth={0.5} borderColor="dark.900" >
            <Pressable
                // cursor="pointer"
                py="0.5"
                flex={1}
                onPress={() => setSelected(0)}
            >
                <Center>
                    <Icon
                        mb="1"
                        as={
                            <MaterialCommunityIcons
                                name={selected === 0 ? 'home' : 'home-outline'}
                            />
                        }
                        color="black"
                        size="sm"
                    />
                    <Text color="black" fontSize="12">
                        Home
                    </Text>
                </Center>
            </Pressable>
            <Pressable
                // cursor="pointer"
                py="0.5"
                flex={1}
                onPress={() => setSelected(1)}
            >
                <Center>
                    <Icon
                        mb="1"
                        as={<Ionicons name={selected === 1 ? "md-search" : 'ios-search-outline'} />}
                        color="black"
                        size="sm"
                    />
                    <Text color="black" fontSize="12">
                        Search
                    </Text>
                </Center>
            </Pressable>
            <Pressable
                // cursor="pointer"
                py="0.5"
                flex={1}
                onPress={() => setSelected(2)}
            >
                <Center>
                    <Icon
                        mb="1"
                        as={
                            <MaterialIcons
                                name={selected === 2 ? 'history' : 'history-toggle-off'}
                            />
                        }
                        color="black"
                        size="sm"
                    />
                    <Text color="black" font="12">
                        History
                    </Text>
                </Center>
            </Pressable>
            <Pressable
                // cursor="pointer"
                py="0.5"
                flex={1}
                onPress={() => setSelected(3)}
            >
                <Center>
                    <Icon
                        mb="1"
                        as={
                            <MaterialCommunityIcons
                                name={selected === 3 ? 'heart' : 'heart-outline'}
                            />
                        }
                        color="black"
                        size="sm"
                    />
                    <Text color="black" fontSize="12">
                        Wishlist
                    </Text>
                </Center>
            </Pressable>
            <Pressable
                // cursor="pointer"
                py="0.5"
                flex={1}
                onPress={() => setSelected(4)}
            >
                <Center>
                    <Icon
                        mb="1"
                        as={
                            <MaterialCommunityIcons
                                name={selected === 4 ? 'view-dashboard' : 'view-dashboard-outline'}
                            />
                        }
                        color="black"
                        size="sm"
                    />
                    <Text color="black" fontSize="12">
                        Dashboard
                    </Text>
                </Center>
            </Pressable>
        </HStack>
    )
}
