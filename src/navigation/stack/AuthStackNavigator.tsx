import {createStaticNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {WelcomeScreen} from '../../screen/auth/WelcomeScreen';
import {SignupScreen} from '../../screen/auth/SignupScreen';
import {ResetPasswordScreen} from '../../screen/auth/ResetPasswordScreen';
import {LoginScreen} from '../../screen/auth/LoginScreen';
import type {StaticParamList} from '@react-navigation/native';
import {colors} from '../../config/colors';
import {font, size} from '../../config/fonts';

const AuthStack = createNativeStackNavigator({
  initialRouteName: 'Welcome',
  screenOptions: {
    headerBackTitleVisible: false,
    headerBackTitle: '',
    headerStyle: {backgroundColor: colors.superLight},
    headerTitleStyle: {
      color: colors.textDark,
      fontFamily: font.InterRegular,
      ...size.lg,
    },
  },
  screens: {
    Welcome: {
      screen: WelcomeScreen,
      options: {
        headerShown: false,
      },
    },
    Login: {
      screen: LoginScreen,
      options: {
        title: 'Login',
      },
    },
    Signup: {
      screen: SignupScreen,
      options: {
        title: 'Signup',
      },
    },
    Reset: {
      screen: ResetPasswordScreen,
      options: {
        title: 'Reset Password',
      },
    },
  },
});

export const AuthNavigator = createStaticNavigation(AuthStack);

type AuthStackParamList = StaticParamList<typeof AuthStack>;

export type AuthScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Welcome'
>;

declare global {
  namespace ReactNavigation {
    interface AuthParamList extends AuthStackParamList {}
  }
}
