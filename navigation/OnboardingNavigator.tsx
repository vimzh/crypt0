import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Intro } from "../screens/onboarding/Intro";
import { SetWalletName } from "../screens/onboarding/SetWalletName";
import { SetDisplayImage } from "../screens/onboarding/SetDisplayImage";
import { SelectIcon } from "../screens/onboarding/SelectIcon";
import { EmojiAvatar } from "../screens/onboarding/EmojiAvatar";
import { WalletCompleted } from "../screens/onboarding/WalletCompleted";
import { EnablePermissions } from "../screens/onboarding/EnablePermissions";
import { EnablePermissionsDone } from "../screens/onboarding/EnablePermissionsDone";
import { SelectBackupMethod } from "../screens/backup/SelectBackupMethod";
import { ICloudBackup } from "../screens/backup/ICloudBackup";
import { ManualBackup } from "../screens/backup/ManualBackup";
import { VerifyBackup } from "../screens/backup/VerifyBackup";
import { BackupCompleted } from "../screens/backup/BackupCompleted";

import type { OnboardingStackParamList } from "./types";

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="SetWalletName" component={SetWalletName} />
      <Stack.Screen name="SetDisplayImage" component={SetDisplayImage} />
      <Stack.Screen name="SelectIcon" component={SelectIcon} />
      <Stack.Screen name="EmojiAvatar" component={EmojiAvatar} />
      <Stack.Screen name="WalletCompleted" component={WalletCompleted} />
      <Stack.Screen name="SelectBackupMethod" component={SelectBackupMethod} />
      <Stack.Screen name="ICloudBackup" component={ICloudBackup} />
      <Stack.Screen name="ManualBackup" component={ManualBackup} />
      <Stack.Screen name="VerifyBackup" component={VerifyBackup} />
      <Stack.Screen name="BackupCompleted" component={BackupCompleted} />
      <Stack.Screen name="EnablePermissions" component={EnablePermissions} />
      <Stack.Screen
        name="EnablePermissionsDone"
        component={EnablePermissionsDone}
      />
    </Stack.Navigator>
  );
};
