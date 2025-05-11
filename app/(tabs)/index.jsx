import { StyleSheet, View } from 'react-native';
import Header from "../../components/mainScreen/Header"
import Characters from "../../components/mainScreen/Characters"
import Search from "../../components/mainScreen/Search"
import Filter from "../../components/mainScreen/Filter"
export default function TabOneScreen() {
  return (
    <>
      <Header />
        <Search />
        <Filter />
      <Characters />
    </>
  );
}

const styles = StyleSheet.create({

});