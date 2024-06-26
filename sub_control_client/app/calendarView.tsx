import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

type CalendarItem = {
  title: string;
  startHour: number;
  endHour: number;
  color: string;
};

type CalendarViewProps = {
  items: CalendarItem[];
  dayOfWeek: string;
  dayNumber: number;
};

const CalendarView: React.FC<CalendarViewProps> = ({ items, dayOfWeek, dayNumber }) => {
  const hours = Array.from({ length: 18 }, (_, i) => 6 + i); // Horas de 6:00 até 20:00

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
        <Text style={styles.dayNumber}>{dayNumber}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {hours.map(hour => (
          <View key={hour} style={styles.hourRow}>
            <Text style={styles.hourText}>{hour}:00</Text>
          </View>
        ))}
        {items.map((item, index) => (
          <View
            key={index}
            style={[
              styles.item,
              {
                top: (item.startHour - 6) * 60, // Ajusta a posição de acordo com a hora de início
                height: (item.endHour - item.startHour) * 60, // Define a altura de acordo com a duração
                backgroundColor: item.color
              }
            ]}
          >
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dayOfWeek: {
    fontSize: 16,
    color: '#888',
  },
  dayNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollView: {
    position: 'relative',
    height: 1080, // 12 horas * 60 minutos
  },
  hourRow: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  hourText: {
    fontSize: 16,
  },
  item: {
    position: 'absolute',
    left: 70,
    right: 10,
    borderRadius: 5,
    padding: 10,
  },
  itemText: {
    color: '#fff',
  },
});

export default CalendarView;
