import React, { useEffect, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useDebuncedValue from '../hooks/useDebuncedValue';

interface IProps {
  style?: StyleProp<ViewStyle>;
  onDebunced: (value: string) => void;
}

const SearchInput = ({ style, onDebunced }: IProps) => {
  const [textValue, setTextValue] = useState('');
  const { debuncedValue } = useDebuncedValue(textValue);
  useEffect(() => onDebunced(debuncedValue), [debuncedValue]);
  return (
    <View style={{ ...styles.container, ...(style as any) }}>
      <View style={styles.textBackground}>
        <TextInput
          placeholder='Buscar pokemón'
          style={styles.textInput}
          autoCapitalize='none'
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />
        <Icon name='search-outline' size={30} color='grey' />
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  textBackground: {
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    height: 45,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  textInput: { flex: 1, fontSize: 15 },
});
