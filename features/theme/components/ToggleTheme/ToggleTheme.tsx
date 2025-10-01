import { Switch, View, Text } from 'react-native';
import { Sun, Moon } from '@/features/shared';
import { useAppDispatch } from '@/store/store';
import { toggleTheme } from '@/features/theme/store/themeSlice';
import { useState } from 'react';
import { useStyles } from './useToggleThemeStyles';
import { IThemeColors } from '../../types/theme.interfaces';

interface IToggleThemeProps {
  themeColors: IThemeColors;
  mode: 'light' | 'dark';
}
export function ToggleTheme({ themeColors, mode }: IToggleThemeProps) {
  const dispatch = useAppDispatch();
  const [isEnabled, setIsEnabled] = useState<boolean>(
    mode === 'light' ? true : false
  );
  const styles = useStyles(themeColors);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Theme mode :</Text>

      <View style={styles.logoView}>
        {mode === 'light' ? <Sun /> : <Moon />}
      </View>

      <Switch
        value={isEnabled}
        style={{ transform: [{ scaleX: 2.0 }, { scaleY: 2.0 }] }}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => {
          dispatch(toggleTheme());
          setIsEnabled(prev => !prev);
        }}
      />
    </View>
  );
}
