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

db = firebase.database()
auth = firebase.auth()
storage = firebase.storage()

#login
email = input("Email Address: ")
password = input("Password: ")
try:
    auth.sign_in_with_email_and_password(email, password)
    print("Hope you didn't think too hard on that.")
except:
    print("Wrong credentials idiot")

#signup
email=input('Enter your email, dumbass')
password=input('Enter your password')
confirmpass=input('Confirm Password')
if password==confirmpass:
    try: 
        auth.create_user_with_email_and_password(email,password)
        print('Account Registered')
    except:
        print('Email already exists, try again idiot')

