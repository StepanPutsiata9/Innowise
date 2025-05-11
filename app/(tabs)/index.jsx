import { useState, useEffect } from 'react';
import { StyleSheet, } from 'react-native';
import Header from "../../components/mainScreen/Header"
import Characters from "../../components/mainScreen/Characters"
import Search from "../../components/mainScreen/Search"
export default function TabOneScreen() {
  return (
    <>
      <Header />
      <Search/>
      <Characters />
    </>
  );
}

const styles = StyleSheet.create({

});