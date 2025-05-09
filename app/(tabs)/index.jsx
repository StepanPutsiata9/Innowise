import { StyleSheet } from 'react-native';
import { Text, View} from '@/components/Themed';
import { Button } from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { increment } from '../../store/slices/counterSlice';
export default function TabOneScreen() {
    const count = useSelector((state) => state.counter.value);
     const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rick and Morty</Text>
      <Text>Count: {count}</Text>
        <Button 
         title="Increment" 
        onPress={() => dispatch(increment())} 
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
