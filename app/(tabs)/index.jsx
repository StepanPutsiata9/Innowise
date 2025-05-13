import { StyleSheet, Text, View } from 'react-native';
import Header from "../../components/mainScreen/Header/Header"
import Characters from "../../components/mainScreen/Characters/Characters"
import Search from "../../components/mainScreen/Search/Search"
import Filter from "../../components/mainScreen/Filter/Filter"
import { useSelector } from 'react-redux';
import BackToRetry from "../../components/errorsScreens/BackToRetryPage"
export default function TabOneScreen() {
  const { isOfflineMode } = useSelector((state) => state.characters);

  return (
    <>
      <Header />
      {!isOfflineMode ? (
        <>
          <Search />
          <Filter />
        </>
      )
      :
      <BackToRetry/>
    }
      <Characters />
    </>
  );
}

const styles = StyleSheet.create({

});