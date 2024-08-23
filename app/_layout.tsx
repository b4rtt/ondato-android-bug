import React, { useCallback, useRef, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import {
  OndatoSdk,
  OndatoSdkState,
  OndatoSdkRef,
  OndatoSdkConfig,
} from "ondato-sdk-react-native";

export default () => {
  const ondatoSdkRef = useRef<OndatoSdkRef>(null);

  const [config] = useState<OndatoSdkConfig>({
    mode: "test",
    identityVerificationId: "your-identity-verification-id",
    language: "en",
    showSplashScreen: true,
    showStartScreen: true,
    showIdentificationWaitingScreen: true,
    showSelfieFrame: true,
    skipRegistrationIfDriverLicense: true,
    showSuccessWindow: true,
  });

  const onStateUpdate = useCallback((state: OndatoSdkState) => {
    console.log(JSON.stringify(state, null, 2));
  }, []);

  return (
    <View style={styles.container}>
      <Button
        disabled={!config?.identityVerificationId}
        title="Start"
        onPress={() => ondatoSdkRef.current?.open()}
      />
      <OndatoSdk
        ref={ondatoSdkRef}
        config={config}
        onStateUpdate={onStateUpdate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#eee",
  },
});
