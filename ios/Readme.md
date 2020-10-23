## Configurazione preliminare per iOS
1. Aprire il progetto in Unity
1. Eseguire build => Export iOS
1. Installazione dipendenze: 
	* Eseguire "npm install" nella root del progetto react
	* Eseguire "pod install" nella cartella ios
1. Aprire il file .xcworkspace in xcode
1. Configurazione header
	* Selezionare RNUnityView.xcodeproj nella cartella Libraries
	* Selezionare il target RNUnityView
	* Selezionare il tab Build Settings
	* Aggiungere a Header Search Paths "$(SRCROOT)/../../../ios/Pods/Headers/Public/React-Core" e "$(SRCROOT)/../../../node_modules/react-native/ReactCommon/yoga"
	* Aprire il file Libraries => RNUnityView.xcodeproj => UnityUtils.mm e commentare la riga 39 "UnityInitStartupTime();"
1. Aprire in xcode la cartella UnityExport/Classes e rimuovere le referenze ai file "DynamicLibEngineAPI-functions.h" e "DynamicLibEngineAPI.mm"
1. Aprire dal menu di xcode Product => Scheme => Edit scheme, selezionare Run dalla barra laterale, selezionare il tab info e modificare Build configuration in Release
1. Assicurarsi che il device selezionato come target non sia un simulatore prima di effettuare la build