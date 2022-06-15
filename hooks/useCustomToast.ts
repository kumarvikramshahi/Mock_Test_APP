import React from "react";
import { useToast, Box } from "native-base";

export default function useCustomToast({ message:String, position, color }) {
    const toast = useToast();

    return toast.show({
            render: () => {
                return <Box bg={ color ? color : "#fac2be" } px = "2" py = "1" rounded = "md" mb = { 50} >
                    { message }
                    < /Box>;
            },
            placement: position ? position : "top"
        });
    })
}