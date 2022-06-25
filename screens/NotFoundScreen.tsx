import { StyleSheet, TouchableOpacity } from 'react-native';
import { DefaultText, DefaultView } from '../components/UI/Themed';
import { RootStackScreenProps } from '../types';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  return (
    <DefaultView style={styles.container}>
      <DefaultText style={styles.title}>This screen doesn't exist.</DefaultText>
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <DefaultText style={styles.linkText}>Go to home screen!</DefaultText>
      </TouchableOpacity>
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
