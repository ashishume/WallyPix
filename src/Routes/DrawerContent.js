import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {FONT_FAMILY, LINKS} from '../../enviroment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const DrawerContent = (props) => {
  const pressHandler = (value) => {
    switch (value) {
      case 'facebook':
        Linking.openURL(LINKS.facebook);
        break;
      case 'instagram':
        Linking.openURL(LINKS.instagram);
        break;
      case 'rate':
        Linking.openURL(LINKS.googlePlayAppLink);
        break;
      case 'report-bug':
        Linking.openURL(LINKS.whatsApp);
        break;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => pressHandler('facebook')}>
        <View style={styles.listItem}>
          <Icon name="facebook" size={40} />
          <Text style={styles.itemText}>Facebook</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => pressHandler('instagram')}>
        <View style={styles.listItem}>
          <Icon name="instagram" size={40} />
          <Text style={styles.itemText}>Instagram</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => pressHandler('rate')}>
        <View style={styles.listItem}>
          <Icon name="folder-star" size={40} />
          <Text style={styles.itemText}>Rate the app</Text>
        </View>
      </TouchableOpacity>
      <View>
        <TouchableOpacity onPress={() => pressHandler('report-bug')}>
          <Text style={styles.bug}>Report a bug</Text>
        </TouchableOpacity>
        <Text style={styles.developerText}>Version 1.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 20,
    flexDirection: 'row',
  },
  itemText: {
    ...FONT_FAMILY,
    fontSize: 20,
    paddingLeft: 10,
  },
  developerText: {
    textAlign: 'center',
    paddingTop: 50,
  },
  bug: {
    ...FONT_FAMILY,
    fontSize: 20,
    paddingTop: 20,
    textAlign: 'center',
  },
});
export default DrawerContent;
