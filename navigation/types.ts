import type { NavigatorScreenParams } from "@react-navigation/native";

export type OnboardingStackParamList = {
  Intro: undefined;
  SetWalletName: undefined;
  SetDisplayImage: undefined;
  SelectIcon: undefined;
  EmojiAvatar: undefined;
  WalletCompleted: undefined;
  SelectBackupMethod: undefined;
  ICloudBackup: undefined;
  ManualBackup: undefined;
  VerifyBackup: undefined;
  BackupCompleted: { type: "icloud" | "manual" };
  EnablePermissions: undefined;
  EnablePermissionsDone: undefined;
};

export type WalletStackParamList = {
  Home: undefined;
  HomeEmpty: undefined;
  CryptoDetails: undefined;
  CryptoDetailsDown: undefined;
  NFTHome: undefined;
  NFTDetails: undefined;
  NFTGallery: undefined;
  TokenSearch: undefined;
  Notifications: undefined;
  SendList: undefined;
  SendNFTList: undefined;
  SendEnterAddress: undefined;
  SendEnterAmount: undefined;
  SendAmountUSD: undefined;
  SendNFTAddress: undefined;
  SendPending: undefined;
  SendSuccess: undefined;
  SendNFTPending: undefined;
  SendNFTSuccess: undefined;
  ReceiveList: undefined;
  ReceiveListCopied: undefined;
  ReceiveQR: undefined;
  SwapList: undefined;
  SwapEnterAmount: undefined;
  SwapAmountFilled: undefined;
  SwapTokenSelect: undefined;
  SwapTokenOtherNetwork: undefined;
  SwapBridge: undefined;
  SwapPending: undefined;
  SwapSuccess: undefined;
  Settings: undefined;
  EditWallet: undefined;
  NetworkSelection: undefined;
  ExportPrivateKey: undefined;
  About: undefined;
  ConnectedDApps: undefined;
  AddressBook: undefined;
  ScanQR: undefined;
  BuyCrypto: undefined;
  Staking: undefined;
  ManageTokens: undefined;
  SecuritySettings: undefined;
  PriceAlerts: undefined;
};

export type ActivitiesStackParamList = {
  Activities: undefined;
  TransactionDetails: undefined;
};

export type BrowserStackParamList = {
  BrowserHome: undefined;
  BrowserWebView: undefined;
  BrowserTabs: undefined;
};

export type MainTabParamList = {
  ActivitiesTab: NavigatorScreenParams<ActivitiesStackParamList>;
  WalletTab: NavigatorScreenParams<WalletStackParamList>;
  BrowserTab: NavigatorScreenParams<BrowserStackParamList>;
};

export type RootStackParamList = {
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  // Modals
  WalletSwitcher: undefined;
  GasSettings: undefined;
  SendConfirm: undefined;
  SendNFTConfirm: undefined;
  SwapConfirm: undefined;
  BridgeConfirm: undefined;
  TokenApproval: undefined;
  WalletConnect: undefined;
  SignMessage: undefined;
};
