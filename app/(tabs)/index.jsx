import { useState, useEffect } from 'react';
import { StyleSheet, } from 'react-native';
import Header from "../../components/mainScreen/Header"
import Characters from "../../components/mainScreen/Characters"
export default function TabOneScreen() {
  return (
    <>
      <Header />
      <Characters />
    </>
  );
}

const styles = StyleSheet.create({

});