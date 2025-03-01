import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Redirect } from "expo-router";
import * as SQLite from "expo-sqlite";
import { View } from "react-native";
import { db } from '~/db/client';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '~/drizzle/migrations';
import { Text } from '~/components/ui/text';

export default function App() {
  const { success, error } = useMigrations(db, migrations);
  console.log(success, error)
  useDrizzleStudio(db);
  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
        <Text>Migration error: {error.name}</Text>

      </View>
    );
  }

  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }
  return <Redirect href='/(main)' />
}