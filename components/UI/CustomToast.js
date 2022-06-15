import React from "react";
import { useToast } from "native-base";

export default function CustomToast({ message, position }) {
    const toast = useToast();
    return toast.show({
        render: () => {
            return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                {message}
            </Box>;
        },
        placement: position ? position : "top"
    });
}