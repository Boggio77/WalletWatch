import pyrebase

firebaseConfig = {
  'apiKey': "AIzaSyC-0lXeT1m70fFmeBa0rRnXOh-0BAJvJBo",
  'authDomain': "walletwatch-2024.firebaseapp.com",
  'projectId': "walletwatch-2024",
  'storageBucket': "walletwatch-2024.appspot.com",
  'messagingSenderId': "668020582728",
  'appId': "1:668020582728:web:f1fee98452288107f0ab7d",
  'measurementId': "G-0P8VZG7HZW",
  'databaseURL': "https://walletwatch-2024-default-rtdb.firebaseio.com/"
}

firebase = pyrebase.initialize_app(firebaseConfig)
