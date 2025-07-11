import { View, StyleSheet, ScrollView, Image, Text, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuthentication } from '@/hooks/useAuthentication';
import { useRouter } from 'expo-router';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';

const HORIZONATAL_LIST = ['My Recipients', 'My Transactions', 'My Cards', 'My Offers'];

const HomeScreen = () => {
  const { isAuthenticated } = useAuthentication();
  const router = useRouter();

  return (
    <ScrollView style={{ backgroundColor: '#222222' }}>
      <View style={styles.headerBackground}>
        <Image
          source={require('@/assets/images/logo_white.png')}
          style={{ width: 140, height: 80, marginHorizontal: 'auto' }}
        />
        <Pressable
          style={{ position: 'absolute', right: 16, top: 28 }}
          onPress={() => router.push('/login')}
        >
          <MaterialIcon name={isAuthenticated ? 'logout' : 'login'} size={30} color="white" />"
        </Pressable>
      </View>
      <ScrollView
        style={{
          paddingBottom: 24,
          paddingTop: 16,
          paddingHorizontal: 16,
        }}
        contentContainerStyle={{ alignItems: 'center' }}
        horizontal
      >
        <View style={styles.plusButton}>
          <MaterialIcons name="add" size={24} color="white" />
        </View>
        {HORIZONATAL_LIST.map((item, idx) => (
          <View key={idx} style={styles.tag}>
            <Text
              style={{
                fontSize: 14,
                color: 'white',
                fontWeight: '400',
                fontFamily: 'Madera',
              }}
            >
              {item}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={{ paddingHorizontal: 8, marginBottom: 40 }}>
        <Text
          style={{
            fontWeight: 700,
            fontSize: 24,
            fontFamily: 'Madera',
            color: 'white',
            paddingHorizontal: 8,
          }}
        >
          Hi Daniel
        </Text>

        <View>
          <View>
            <Image
              source={require('@/assets/images/home_first_card.png')}
              style={{ height: 'auto', width: '100%', aspectRatio: '16 / 9', objectFit: 'contain' }}
            />
          </View>
          <View
            style={{
              elevation: 2,
              borderRadius: 20,
              overflow: 'hidden',
              marginHorizontal: 8,
              marginTop: -12,
            }}
          >
            <Image
              source={require('@/assets/images/home_second_card.png')}
              style={{ height: 'auto', width: '100%', aspectRatio: '1 /1 ' }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    width: '100%',
    alignItems: 'center',
    marginTop: 36,
    elevation: 1,
    position: 'relative',
  },
  plusButton: {
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 50,
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#3e3e3e',
    paddingHorizontal: 24,
    borderRadius: 25,
    borderColor: '#aaa',
    borderWidth: 1,
    marginLeft: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  headerCard: {
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 16,
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
