import { View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const HomeScreen = () => {
  return (
    <ScrollView>
      <View style={styles.headerBackground} />
      <View style={{ marginTop: 96, paddingHorizontal: 16, marginBottom: 40 }}>
        <Image
          source={require('@/assets/images/logo_white.png')}
          style={{ width: 120, height: 40, marginHorizontal: 'auto' }}
        />
        <View style={styles.searchInput}>
          <Ionicons size={28} color="white" name="search-outline" style={{ marginRight: 8 }} />
          <Text style={{ color: 'white', fontSize: 16 }}>What are you looking for?</Text>
          <Ionicons size={28} color="white" name="camera-outline" style={{ marginLeft: 'auto' }} />
        </View>
        <View style={styles.headerCard}>
          <Ionicons
            size={36}
            color="blue"
            name="alert-circle-outline"
            style={{ marginRight: 12 }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontWeight: 700,
                fontSize: 24,
                textTransform: 'uppercase',
              }}
            >
              Apple pay & google pay is here!
            </Text>
            <Text style={{ fontSize: 18 }}>Fint out more</Text>
          </View>
        </View>
        <View style={{ paddingTop: 24, paddingHorizontal: 12 }}>
          <Text
            style={{ fontSize: 24, color: '#1c4991', fontWeight: 800, textTransform: 'uppercase' }}
          >
            Hi AARON,
          </Text>
          <Text
            style={{ fontSize: 40, color: '#152c56', fontWeight: 900, textTransform: 'uppercase' }}
          >
            Welcome back
          </Text>
        </View>
        <View>
          <View style={{ elevation: 2, borderRadius: 20, overflow: 'hidden', marginVertical: 24 }}>
            <Image
              source={{
                uri: 'https://media.screwfix.com/is/image/ae235/Screwfix_sprint_5_pound_fw_lp_image_banner_sm?wid=634&hei=542&dpr=on',
              }}
              style={{ height: 'auto', width: '100%', aspectRatio: '16 / 9' }}
            />
          </View>
          <View style={{ elevation: 2, borderRadius: 20, overflow: 'hidden', marginVertical: 24 }}>
            <Image
              source={{
                uri: 'https://media.screwfix.ie/is/image/ae235/winter3_pricedrop_fw_generic_img_banner_sm?wid=634&hei=592&dpr=on',
              }}
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
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
    height: 240,
    backgroundColor: '#1c4991',
  },
  searchInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#152c56',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
  },
  headerCard: {
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
