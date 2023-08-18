import {View,Text} from "react-native"
import { COLOR } from "./color";

export default({
    hasInfo,// 리메인드 타임 텍스트가 도착정보 없음 일때 true
    remainedTimeText,// 8분 0초, 곧 도착 , 도착정보 없음
    numOfRemainedStops,
    seatStatusText,//1석 ,여유 , 보통
}) => {
    if (!hasInfo) return <Text style={{color:COLOR.GRAY_2}}>도착 정보 없음</Text>
    return(
        <View style={{flexDirection:"row",alignItems:"center"}}>
            <Text style={{color:COLOR.BLACK, marginRight:10}}>{remainedTimeText} </Text>
            <View style={{
                borderWidth:0.5,
                borderColor: COLOR.GRAY_1,
                borderRadius:3,
                padding:2,
                flexDirection:"row",
                alignItems:"center"
                }}>
                    <Text style={{color:COLOR.GRAY_3,marginRight:3}}>{numOfRemainedStops}번째전 </Text>
                    <Text style={{color:COLOR.CORAL}}>{seatStatusText}</Text>
            </View>
            
        </View>
        
    );

}