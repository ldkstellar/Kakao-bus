import { TouchableOpacity } from "react-native"
import {SimpleLineIcons} from '@expo/vector-icons'
import { COLOR } from "./color";

export default({name})=>
    (   <TouchableOpacity
            style={{padding:10}}>
            <SimpleLineIcons 
                name={name} 
                size={20}
                color={COLOR.WHITE}/>
        </TouchableOpacity>
        );