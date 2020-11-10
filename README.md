# PAUN React Native App 

L'app è sviluppata utilizzando [React Native](https://facebook.github.io/react-native/)

## Per iniziare
Lanciare 'npm install' nella cartella del progetto per scaricare tutti i moduli necessari all'applicazione (la cartella node_modules verrà creata).  
Lanciare 'npx react-native run-android' (oppure run-ios) per eseguire l'app su un dispositivo collegato o su un emulatore attivo.  

## Funzionalità
L'app permette di effettuare il login attraverso social network (Google o Facebbok) oppure come opsite.  
A scopo di test è possibile inserire l'ip del server con il quale comunicare, se si vuole testare con un istanza del server avviata in locale.  
Alla schermata con pulsante di avvio di Unity è presente anche un pulsante che simula le fasi di comunicazione con il server nel caso di avvio, conferma e chiusura di una sessione di utilizzo di una postazione.  

## In via di sviluppo
Monitoraggio della posizione dell'utente attraverso GPS per notificare in caso di vicinanza ad una postazione e invogliare l'utente ad utilizzarla mediante scan del QR Code

## Unity
Il progetto Unity integrato è un progetto di esempio con un semplice cubo che gira. Lo scopo è solo di mostrare come integrare un progetto Unity in un app sviluppata con React Native.

## Build Android
1. Aprire il progetto in Unity
1. Eseguire Build => Export Android
1. Aprire la cartella Builds ed eliminare il file "PaunApp-0.1-v1.symbols.zip" se presente
1. Effettuare la build dell'app React-Native

## Build iOS
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
1. Effettuare la build dell'app React-Native

# Integrazione Unity
Per integrare un proprio progetto Unity è necessario innanzitutto inserirlo all'interno della cartella /unity al posto del progetto di esempio, successivamente si deve copiare la cartella [`Assets/Scripts`](https://github.com/ZioPepito/PaunApp/tree/master/unity/IntegrationSample/Assets/Scripts) e il file [`link.xml`](https://github.com/ZioPepito/PaunApp/blob/master/unity/IntegrationSample/Assets/link.xml) nel proprio progetto. È necessario utilizzare una versione di Unity non superiore a 2019.2.x. Il modulo utilizzato per l'integrazione è presente al seguente link https://www.npmjs.com/package/react-native-unity-view.

## Passaggi aggiuntivi Android
In *Player Settings -> Other Settings* impostare come segue:
1. Scripting Backend: IL2CPP
1. Api compatibility level: .NET 4.x
1. Auto Graphics API: non selezionato
1. Graphics API: OpenGLES3 e OpenGLES2 in quest'ordine
1. Target Architectures: ARM64 selezionato

In *Player Setting -> Resolution and presentation* deselezionare *Start in full screen mode* e *Render outside safe area*.

## Passaggi aggiuntivi iOS
In *Player Settings -> Other Settings* selezionare *Auto Graphics API*

# PaunApp dettagli tecnici
Versione React Native: 0.61.0  
Versione Node: 12.9.1  
Versione npm: 6.10.2  
Versione Unity: 2019.2.x
