import { Tabs } from "expo-router";

import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveBackgroundColor: "rgba(34, 0, 255, 0.06)" , tabBarActiveTintColor:"coral"}}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({color}) => <AntDesign name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen name="login" options={{ title: "Login", tabBarIcon:()=><Entypo name="login" size={24} color="black" /> }} />
    </Tabs>
  );
}
