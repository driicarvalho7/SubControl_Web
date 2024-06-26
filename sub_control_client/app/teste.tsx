import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CalendarView from './calendarView';

const items = [
  {
    title: 'Meeting',
    startHour: 9,
    endHour: 10,
    color: 'red',
  },
  {
    title: 'Lunch Break',
    startHour: 12,
    endHour: 13,
    color: 'green',
  },
  {
    title: 'Work Session',
    startHour: 14,
    endHour: 16,
    color: 'blue',
  },
  {
    title: 'Sleep',
    startHour: 19,
    endHour: 22,
    color: '#2b5a66',
  },
];

export default function Teste() {
    return (
      <SafeAreaView style={styles.container}>
        <CalendarView 
            items={items} 
            dayOfWeek="Wednesday" 
            dayNumber={19} 
        />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });