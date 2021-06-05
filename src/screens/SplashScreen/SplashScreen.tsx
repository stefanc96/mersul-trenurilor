import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../store';
import {setTimetableInfo} from '../../store/reducers';
import {StackActions} from '@react-navigation/native';
import {ScreenEnum} from '../../types';
import {Layout, Text} from '@ui-kitten/components';
import LottieView from 'lottie-react-native';
import {strings} from '../../locales';
import {StackScreenProps} from '@react-navigation/stack';

const mersulTrenurilor = require('../../../mersul-trenurilor.json');

export const SplashScreen: React.FC<StackScreenProps<any>> = ({navigation}) => {
  const timetable = useSelector((state: AppState) => state.timetable);
  const dispatch = useDispatch();
  const navigateToDashboard = () => {
    const replaceAction = StackActions.replace(ScreenEnum.Dashboard);

    navigation.dispatch(replaceAction);
  };
  useEffect(() => {
    if (!timetable.metadata?.mtValabilPinaLa) {
      dispatch(setTimetableInfo(mersulTrenurilor.cfr));
    }
  }, [dispatch, timetable]);

  const onAnimationFinish = () => {
    navigateToDashboard();
  };

  return (
    <Layout style={styles.container}>
      <LottieView
        onAnimationFinish={onAnimationFinish}
        autoPlay
        loop={false}
        source={require('../../../assets/animations/loading-train.json')}
      />
      <Text category={'h1'} style={styles.loading}>
        {strings.loadingApp}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    bottom: 60,
    position: 'absolute',
  },
});
