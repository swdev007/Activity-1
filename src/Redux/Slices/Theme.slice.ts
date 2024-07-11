import {createSlice} from '@reduxjs/toolkit';

export interface ThemeState {
  AppTheme: {
    colors: {
      mainColor: string;
      newinput: string;
      white: string;
      shadow: string;
      newinputfied: string;
      lighttext: string;
      textcolor: string;
      black: string;
      red: string;
      newback: string;
      newtext: string;
      newview: string;
      grey: string;
      newbtntext: string;
      cont: string;
      // boxshadow: 'rgba(0, 0, 0, 0.1)',
      boxshadow: string;
      ApptextColor: string;
      border: string;
      back: string;
      value: string;
      dis: string;
      btnback: string;
      head: string;
      green: string;
      text: string;
      newscreenback: string;
      ship: string;
      brdrclr: string;
      newbackcolor: string;
      newnonfocused: string;
      primary: string;
      greyDark: string;
    };
    icons: {
      splashBackground: any;
      splashLogo2: any;
      splash: any;
      loginBackground: any;
      email: any;
      lock: any;
      unLock: any;
      rightIcon: any;
      eye: any;
      home: any;
      camera: any;
      locationImage: any;
      audio: any;
      audio2: any;
      info: any;
      collection: any;
      profileImage: any;
      profile: any;
      mobile: any;
      document: any;
      placeholder: any;
      addItem: any;
      edit: any;
      help: any;
    };
    fonts: {
      InterBlack: string;
      InterBold: any;
      InterExtraBold: any;
      InterExtraLight: any;
      InterLight: any;
      InterMedium: any;
      InterRegular: any;
      InterSemiBold: any;
      InterThin: any;
    };
  };
}

let initialState = {
  AppTheme: {
    icons: {
      splashBackground: require('../../Assets/Images/splashbackground.png'),
      splashLogo2: require('../../Assets/Images/splashlogo2.png'),
      splash: require('../../Assets/Images/splash.png'),
      loginBackground: require('../../Assets/Images/loginbackground.png'),
      email: require('../../Assets/Images/email.png'),
      lock: require('../../Assets/Images/lock.png'),
      unLock: require('../../Assets/Images/lock2.png'),
      rightIcon: require('../../Assets/Images/righticon.png'),
      eye: require('../../Assets/Images/eye.png'),
      home: require('../../Assets/Images/home.png'),
      camera: require('../../Assets/Images/camera.png'),
      locationImage: require('../../Assets/Images/location.png'),
      audio: require('../../Assets/Images/audio.png'),
      audio2: require('../../Assets/Images/audio2.png'),
      info: require('../../Assets/Images/info.png'),
      collection: require('../../Assets/Images/collection.png'),
      profileImage: require('../../Assets/Images/profilemg.png'),
      mobile: require('../../Assets/Images/mobile.png'),
      document: require('../../Assets/Images/document.png'),
      placeholder: require('../../Assets/Images/placeholder.png'),
      addItem: require('../../Assets/Images/additem.png'),
      edit: require('../../Assets/Images/edit.png'),
      help: require('../../Assets/Images/help.png'),
      profile: require('../../Assets/Images/profile.png'),
      power: require('../../Assets/Images/power.png'),
    },
    fonts: {
      InterBlack: 'Inter-Black',
      InterBold: 'Inter-Bold',
      InterExtraBold: 'Inter-ExtraBold',
      InterExtraLight: 'Inter-ExtraLight',
      InterLight: 'Inter-Light',
      InterMedium: 'Inter-Medium',
      InterRegular: 'Inter-Regular',
      InterSemiBold: 'Inter-SemiBold',
      InterThin: 'Inter-Thin',
    },
    colors: {
      mainColor: '#102833',
      newinput: '#F5F6FA',
      white: '#ffff',
      shadow: '#000029',
      newinputfied: '#475266',
      lighttext: '#BEBEBE',
      textcolor: '#484545',
      black: '#000000',
      red: '#D24747',
      newback: '#7048C7',
      newtext: '#211D1D',
      newview: '#040316',
      grey: '#D9D9D9',
      newbtntext: '#3F3F3F',
      cont: '#F5F5F5',
      // boxshadow: 'rgba(0, 0, 0, 0.1)',
      boxshadow: '#000029',
      ApptextColor: '#686868',
      border: '#EDEDED',
      back: '#EEEEEE',
      value: '#151515',
      dis: '#7D7D7D',
      btnback: '#F4F4F4',
      head: '#777070',
      green: '#00AC64',
      text: '#0F1D24',
      newscreenback: '#DDDDDD',
      ship: '#448558',
      brdrclr: '#EFEFEF',
      newbackcolor: '#F3F3F3',
      newnonfocused: '#9F9F9F',
      primary: '#1F54FD',
      greyDark: '#727582',
    },
  },
};

export const ThemeState = createSlice({
  name: 'themeState',
  initialState,
  reducers: {},
});

export const {} = ThemeState.actions;
