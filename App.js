import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import {RefreshControl, SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BusInfo from './src/Businfo';
import { COLOR } from './src/color';
import { busStop, getBusNumColorByType, getRemainedTimeText, getSeatStatusText, getSections } from './src/data';
import Btn from './src/Btn';
import Margin from './src/Margin';
import BookmarkButton from './src/BookmarkButton';
import { useTheme } from './src/use-thema';



  const bustStopBookmarkSize = 25;
  const busStopBookmarkPaddingHorizontal = 6;

 export default function App() {
    const {NEWCOLOR} = useTheme();
    const sections = getSections(busStop.buses);
    const [now,setNow] =useState(dayjs());
    const [refreshing,setRefeshing] = useState(false);

    const onRefresh = ()=>{
      console.log('onRefreshing');
      setRefeshing(true);
    }

    useEffect(()=>{
      setTimeout(() => {
        //API refetch 완료
        setNow(dayjs());
        setRefeshing(false);
      }, 3000);
    },[refreshing]);
    
    const onPressBusStopBookMark = ()=>{
      //Todo 서버측 통신
    }
    const ListFooterComponent = ()=>{
      return(<Margin height={30}/>);
    }

    const ItemSepardatorComponent = ()=>{
      return(<View style={{width:"100%",height:1,backgroundColor:COLOR.GRAY_1}}/>);
    }
    

    const ListHeaderComponent = ()=>(
      <View style={{
        height:180,
        backgroundColor: COLOR.GRAY_3}}>
        
        {/* 정류소 이름 방향 */}
        <View style={{width:"100%",justifyContent:"center",alignItems:"center"}}>
          <Margin height={10}/>
          <Text style={{color:NEWCOLOR.WHITE, fontSize: 13}}>{busStop.id}</Text>
          {/* 여기에서 부터 수정하면 된다. */}
          <Margin height={4}/>
          <Text style={{color:COLOR.WHITE, fontSize: 20}}>{busStop.name}</Text>
          
          <Margin height={4}/>
          <Text style={{color:COLOR.GRAY_1, fontSize: 14}}>{busStop.directionDescription}</Text>
  
        {/* 북마크 */}
          <Margin height={20}/>
          <BookmarkButton
            size={bustStopBookmarkSize} // 25 + 5+ 5
            style={{
              borderWidth:0.3,
              borderColor:COLOR.WHITE,
              borderRadius:bustStopBookmarkSize + busStopBookmarkPaddingHorizontal * 2/2,
              padding:5
            }}
            isBookmarked={busStop.isBookmarked}
            onPress={onPressBusStopBookMark}/>
            <Margin height={25}/>
        </View>
        
      </View>
    )

    const renderSectionHeader = ({section:{title}})=>(
      <View style={{
        paddingLeft:13,
        paddingVertical:5,
        backgroundColor:COLOR.GRAY_1,
        borderTopWidth:0.5,
        borderBottomWidth:0.5,
        borderTopColor:COLOR.GRAY_2,
        borderBottomColor:COLOR.GRAY_2
        }}>
        <Text style={{fontSize:12,color:COLOR.GRAY_4}}>{title}</Text>
      </View>
      )
    const renderItem = ({ item: bus }) => {
    const numColor = getBusNumColorByType(bus.type);

    /**
     * Start
     */
    
    // undefined ?? null -> null 
    // { ... } ?? null -> { ... }
    const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null;//null safety 
    const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
    const newNextBusInfos =
      !firstNextBusInfo && !secondNextBusInfo
        ? [null]
        : [firstNextBusInfo, secondNextBusInfo];
    // if (bus.num === 360) {
    //   console.log(bus.num, 'newNextBusInfos', newNextBusInfos); // TODO: 확인
    // }
    const processedNextBusInfos = newNextBusInfos.map((info) => {
      if (!info)
        return {
          hasInfo: false,
          remainedTimeText: "도착 정보 없음",
        };

      const { arrivalTime, numOfRemainedStops, numOfPassengers } = info;
      const remainedTimeText = getRemainedTimeText(now, arrivalTime);
      const seatStatusText = getSeatStatusText(bus.type, numOfPassengers);
      return {
        hasInfo: true,
        remainedTimeText,
        numOfRemainedStops,
        seatStatusText,
      };
    });
    /**
     * End
     */
    return (
      <BusInfo
        isBookmarked={bus.isBookmarked}
        onPressBookmark={() => {}} // TODO
        num={bus.num}
        directionDescription={bus.directionDescription}
        numColor={numColor}
        processedNextBusInfos={processedNextBusInfos}
      />
     )
   };
   
   useEffect(()=>{

   const interval =  setInterval(()=>{
      const newNow = dayjs();
      setNow(newNow);
    },5000);
    return ()=>{
      clearInterval(interval);//
    }
  
   },[]);
   return (

     <View style={styles.container}>
      {/* 뒤로가기와 홈 아이콘  */}
      <View style={{backgroundColor:COLOR.GRAY_3,width:"100%"}}>

      <SafeAreaView style={{flexDirection:"row",justifyContent:"space-between"}}> 
            <Btn name='arrow-left'/>
            <Btn name="home"/>
        </SafeAreaView>
        <View style={{position:"absolute",width:"100%",height:500,backgroundColor:COLOR.GRAY_3,zIndex:-1}}/>
      </View>
       <SectionList
        ItemSeparatorComponent={ItemSepardatorComponent}
        ListHeaderComponent={ListHeaderComponent}
        style={{ flex:1, width:"100%"}}
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
      
    </View>
    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});