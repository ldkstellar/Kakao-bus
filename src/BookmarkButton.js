import { TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons';

import { COLOR } from "./color";
import { useState } from "react";
const useBookmark = (initalIsBookmarked)=>{
    const [isBookmarked,setIsBookmarked] = useState(initalIsBookmarked);
    const toogleIsBookmarked = ()=>setIsBookmarked(!isBookmarked);
    return({isBookmarked,toogleIsBookmarked});
};

export default ({
    size,
    isBookmarked:isBookmarkedProp,
    onPress,
    style
}) => {
    const {isBookmarked,toogleIsBookmarked} = useBookmark(isBookmarkedProp);    
    
    return(
        <TouchableOpacity
            style={style}
            onPress={toogleIsBookmarked}>
            <Entypo 
                name="star" size={size} 
                color={isBookmarked ? COLOR.YELLOW:COLOR.GRAY_1} />
        </TouchableOpacity>
    )
}