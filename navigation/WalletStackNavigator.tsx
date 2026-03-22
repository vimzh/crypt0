import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/home/Home";
import { HomeEmpty } from "../screens/home/HomeEmpty";
import { CryptoDetails } from "../screens/home/CryptoDetails";
import { CryptoDetailsDown } from "../screens/home/CryptoDetailsDown";
import { NFTHome } from "../screens/home/NFTHome";
import { NFTDetails } from "../screens/home/NFTDetails";
import { TokenSearch } from "../screens/home/TokenSearch";
import { Notifications } from "../screens/home/Notifications";
import { SendList } from "../screens/send/SendList";
import { SendNFTList } from "../screens/send/SendNFTList";
import { SendEnterAddress } from "../screens/send/SendEnterAddress";
import { SendEnterAmount } from "../screens/send/SendEnterAmount";
import { SendAmountUSD } from "../screens/send/SendAmountUSD";
import { SendNFTAddress } from "../screens/send/SendNFTAddress";
import { SendPending } from "../screens/send/SendPending";
import { SendSuccess } from "../screens/send/SendSuccess";
import { SendNFTPending } from "../screens/send/SendNFTPending";
import { SendNFTSuccess } from "../screens/send/SendNFTSuccess";
import { ReceiveList } from "../screens/receive/ReceiveList";
import { ReceiveListCopied } from "../screens/receive/ReceiveListCopied";
import { ReceiveQR } from "../screens/receive/ReceiveQR";
import { SwapList } from "../screens/swap/SwapList";
import { SwapEnterAmount } from "../screens/swap/SwapEnterAmount";
import { SwapAmountFilled } from "../screens/swap/SwapAmountFilled";
import { SwapTokenSelect } from "../screens/swap/SwapTokenSelect";
import { SwapTokenOtherNetwork } from "../screens/swap/SwapTokenOtherNetwork";
import { SwapBridge } from "../screens/swap/SwapBridge";
import { SwapPending } from "../screens/swap/SwapPending";
import { SwapSuccess } from "../screens/swap/SwapSuccess";
import { Settings } from "../screens/settings/Settings";
import { EditWallet } from "../screens/settings/EditWallet";
import { NetworkSelection } from "../screens/settings/NetworkSelection";
import { ExportPrivateKey } from "../screens/settings/ExportPrivateKey";
import { About } from "../screens/settings/About";
import { ConnectedDApps } from "../screens/settings/ConnectedDApps";
import { AddressBook } from "../screens/settings/AddressBook";
import { ScanQR } from "../screens/home/ScanQR";
import { BuyCrypto } from "../screens/home/BuyCrypto";
import { NFTGallery } from "../screens/home/NFTGallery";
import { Staking } from "../screens/home/Staking";
import { ManageTokens } from "../screens/settings/ManageTokens";
import { SecuritySettings } from "../screens/settings/SecuritySettings";
import { PriceAlerts } from "../screens/settings/PriceAlerts";

import type { WalletStackParamList } from "./types";

const Stack = createNativeStackNavigator<WalletStackParamList>();

export const WalletStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HomeEmpty" component={HomeEmpty} />
      <Stack.Screen name="CryptoDetails" component={CryptoDetails} />
      <Stack.Screen name="CryptoDetailsDown" component={CryptoDetailsDown} />
      <Stack.Screen name="NFTHome" component={NFTHome} />
      <Stack.Screen name="NFTDetails" component={NFTDetails} />
      <Stack.Screen name="TokenSearch" component={TokenSearch} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="SendList" component={SendList} />
      <Stack.Screen name="SendNFTList" component={SendNFTList} />
      <Stack.Screen name="SendEnterAddress" component={SendEnterAddress} />
      <Stack.Screen name="SendEnterAmount" component={SendEnterAmount} />
      <Stack.Screen name="SendAmountUSD" component={SendAmountUSD} />
      <Stack.Screen name="SendNFTAddress" component={SendNFTAddress} />
      <Stack.Screen name="SendPending" component={SendPending} />
      <Stack.Screen name="SendSuccess" component={SendSuccess} />
      <Stack.Screen name="SendNFTPending" component={SendNFTPending} />
      <Stack.Screen name="SendNFTSuccess" component={SendNFTSuccess} />
      <Stack.Screen name="ReceiveList" component={ReceiveList} />
      <Stack.Screen name="ReceiveListCopied" component={ReceiveListCopied} />
      <Stack.Screen name="ReceiveQR" component={ReceiveQR} />
      <Stack.Screen name="SwapList" component={SwapList} />
      <Stack.Screen name="SwapEnterAmount" component={SwapEnterAmount} />
      <Stack.Screen name="SwapAmountFilled" component={SwapAmountFilled} />
      <Stack.Screen name="SwapTokenSelect" component={SwapTokenSelect} />
      <Stack.Screen
        name="SwapTokenOtherNetwork"
        component={SwapTokenOtherNetwork}
      />
      <Stack.Screen name="SwapBridge" component={SwapBridge} />
      <Stack.Screen name="SwapPending" component={SwapPending} />
      <Stack.Screen name="SwapSuccess" component={SwapSuccess} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="EditWallet" component={EditWallet} />
      <Stack.Screen name="NetworkSelection" component={NetworkSelection} />
      <Stack.Screen name="ExportPrivateKey" component={ExportPrivateKey} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="ConnectedDApps" component={ConnectedDApps} />
      <Stack.Screen name="AddressBook" component={AddressBook} />
      <Stack.Screen name="ScanQR" component={ScanQR} />
      <Stack.Screen name="BuyCrypto" component={BuyCrypto} />
      <Stack.Screen name="NFTGallery" component={NFTGallery} />
      <Stack.Screen name="Staking" component={Staking} />
      <Stack.Screen name="ManageTokens" component={ManageTokens} />
      <Stack.Screen name="SecuritySettings" component={SecuritySettings} />
      <Stack.Screen name="PriceAlerts" component={PriceAlerts} />
    </Stack.Navigator>
  );
};
