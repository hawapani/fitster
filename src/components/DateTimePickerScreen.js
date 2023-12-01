import React, {useState} from 'react';
import DatePicker from 'react-native-modern-datepicker';

const DateTimePickerScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  return (
     <DatePicker
       onSelectedChange={date => setSelectedDate(date)}
     />
);
};

export default DateTimePickerScreen;


/*  OLD
import DatePicker from 'react-native-datepicker';

const DateTimePickerScreen = () => {
    const [date, setDate] = useState('09-10-2020');
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>
            React Native Date Picker – 
            To Pick the Date using Native Calendar
          </Text>
          <DatePicker
            style={styles.datePickerStyle}
            date={date} // Initial date from state
            mode="date" // The enum of date, datetime and time
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-01-2016"
            maxDate="01-01-2019"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                //display: 'none',
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {
              setDate(date);
            }}
          />
        </View>
      </SafeAreaView>
    );
  };
  
  export default DateTimePickerScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      padding: 20,
    },
    datePickerStyle: {
      width: 200,
      marginTop: 20,
    },
  });
  */