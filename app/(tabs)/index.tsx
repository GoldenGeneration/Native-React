import { DATABASE_ID, HABITS_COLLECTION_ID, tablesDB } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit } from "@/types/database.type";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button } from "react-native-paper";

export default function Index() {
  const { signOut, user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);

  const fetchHabits = async () => {
    try {
      const response = await tablesDB.listRows({
        databaseId: DATABASE_ID!,
        tableId: HABITS_COLLECTION_ID!,
        queries: [Query.equal("user_id", user?.$id ?? "")],
      });

      setHabits(response.rows as unknown as Habit[]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.view}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      {/* <Link href="/login">Login Page</Link> */}
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
