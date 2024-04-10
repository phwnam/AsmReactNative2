import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ToastAndroid } from 'react-native';

const signUp = (fullname, email, password, repass) => {
    console.log('Signing up:', email);
    if (!fullname || !email || !password|| !repass) {
        alert('Không để trống')
    } else if (password != repass){
        alert('Mật khẩu không trùng khớp')
    } else {
        return auth().createUserWithEmailAndPassword(email.trim(), password)
            .then(cred => {
                const { uid } = cred.user;
                auth().currentUser.updateProfile({
                    displayName: fullname
                });
                return uid;
            })
            .then(() => {
                console.log('Tài khoản đã được tạo');
            })
            .catch(err => {
                if (err.code === 'auth/email-already-in-use') {
                    console.log('Email đã tồn tại');
                    ToastAndroid.show('Email đã tồn tại', ToastAndroid.SHORT);
                }
                if (err.code === 'auth/invalid-email') {
                    console.log('Email của bạn không hợp lệ');
                    ToastAndroid.show('Email của bạn không hợp lệ', ToastAndroid.SHORT);
                }
                console.log(err);
            }

            )
    }
}

const signIn = (email, password) => {
    console.log('Logging in:', email);
    if (!email || !password) {
        alert('Nhập thông tin');
    } else {
        return auth().signInWithEmailAndPassword(email.trim(), password)
            .then(() => {
                console.log(auth().currentUser.uid);
            })
            .catch(
                err => alert(err.code, err.message)
            )
    }
}

const signOut = () => {
    return auth().signOut();
}

GoogleSignin.configure({
    webClientId: '921924305456-1roq81lsnd8mg2vcb257nrd265katilf.apps.googleusercontent.com'
});

const onGoogleSignIn = async () => {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
    } catch (error) {
        console.log('Lỗi Đăng nhập bằng Google:', error);
        
        throw error; // Re-throw the error for further handling
    }
};

const Auth = {
    signIn, signOut, signUp, onGoogleSignIn
}
export default Auth