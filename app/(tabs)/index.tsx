import { DATABASE_ID, HABITS_COLLECTION_ID, tablesDB } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit } from "@/types/database.type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button, Text } from "react-native-paper";

export default function Index() {
  const { signOut, user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);

  // useEffect(() => {
  //   fetchHabits();
  // }, [user]);

  const fetchHabits = async () => {
    try {
      const response = await tablesDB.listRows({
        databaseId: DATABASE_ID!,
        tableId: HABITS_COLLECTION_ID!,
        queries: [Query.equal("user_id", user?.$id ?? "")],
      });
      console.log(response.rows);
      setHabits(response.rows as unknown as Habit[]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.header}>Today's Habits</Text>
      {habits.length === 0 ? (
        <View>
          <Text>No habits added yet.</Text>
        </View>
      ) : (
        habits?.map((habits, key) => (
          <View key={key}>
            <Text>{habits.title}</Text>
            <Text>{habits.description}</Text>
            <View>
              <MaterialCommunityIcons name="fire" size={25} color="#ff9800" />
              <Text>{habits.streak_count} days streak</Text>
            </View>
            <View>
              <Text>{habits.frequency.charAt(0).toUpperCase() + habits.frequency.slice(1)}</Text>
            </View>
          </View>
        ))
      )}
      <Button mode="text" onPress={signOut} icon="logout">
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
