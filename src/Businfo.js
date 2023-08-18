import {View,Text} from "react-native"
import AramButton from "./AramButton"
import BookmarkButton from "./BookmarkButton"
import { COLOR } from "./color"
import NextBusInfo from "./NextBusInfo"
export default ({
        isBookmarked,
        onPressBookmark,num,
        directionDescription,
        numColor,
        processedNextBusInfos
    }) => {
    return(
        <View style={{height:75,flexDirection:"row",backgroundColor:COLOR.WHITE}}>
            <View style={{flexDirection:"row",flex:0.80, alignItems:"center",}}>
                {/* 북마크 */}
                <BookmarkButton
                    size={20}
                    style={{paddingHorizontal: 10}}
                    isBookmarked={isBookmarked}
                    onPress={onPressBookmark}
                />

                {/* 버스번호 , 방향 */}
                <View style={{flex:1}} >
                    <Text style={{color:numColor, fontSize:20}}>{num}</Text>
                    <Text style={{color:COLOR.GRAY_3, fontSize:13 ,marginRight:5}}>{directionDescription} 방향</Text>
                </View>
            </View>
                
                    <View style={{flex:1 ,flexDirection:"row",alignItems:"center"}}>
                        {/* M분 S초 /N번째 전 / 여유 */}
                        <View style={{flex:1}}>

                        {processedNextBusInfos.map((info,index)=>(
                             <NextBusInfo
                             key={index}
                             hasInfo={info.hasInfo}
                             remainedTimeText={info.remainedTimeText}
                             numOfRemainedStops={info.numOfRemainedStops}
                             seatStatusText={info.seatStatusText}
                             />
                        ))
                        }
                        </View>
                    
                        {/* 알람 아이콘  */}
                        <AramButton //서버측 통신을 위해서
                            onPress={{}} style={{paddingHorizontal:15}}
                            /> 
                        

                    </View>

                

        </View>
    )
}