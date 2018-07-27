'user strict';
import React, { Component } from 'react';
import { StyleSheet, Text, Alert, View, Button } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataQR: '', // dữ liệu quét được
      status: 'Sẵn sàng quét' // title của button
    };
  }

  onSuccess(e) {
    // Khi thành công quét : e là đầu ra của code
    this.setState({
      // thay đổi các trạng thái
      dataQR:  e.data, // gán dữ liệu cho dataQR = e.data
      status: 'Ấn lại để tiếp tục', // trạng thái của button
    })
    
    Alert.alert(
      // hiện ra thông báo : code 
      'QR code' ,
      'Code đây: ' + e.data, // dataQR
    )

  }

  render() {
    return (
      <View style={styles.conMain}>
        <View style={styles.conHeader}>
          <Text style={styles.textHeader}>QR code</Text>
        </View>

        <View style={styles.conQR}>

          <QRCodeScanner
            onRead={this.onSuccess.bind(this)}
            ref={(node) => {this.scanner = node}}
            topContent={
              <View>
               
                <Button
                  onPress={() => {
                    // Ấn nút để quét lại
                    this.scanner.reactivate()
                    this.setState({status:'Sẵn sàng quét'})
                  }}
                  title={this.state.status}
                />
              </View>
            }
            bottomContent={
              <View>
                <Text>Dữ liệu vừa quét dataQR: </Text>
                <Text>{this.state.dataQR}</Text>
              </View>
            }
            showMarker={true} // hiện khung hình khi quét
            permissionDialogTitle={'Info'}
            permissionDialogMessage={'Hello Dialog'}
          ></QRCodeScanner>
        </View>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  conMain: {
    flex: 1
  },
  conHeader: {
    flex: 1,
    backgroundColor: '#6200EE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textHeader: {
    fontSize: 18,
    color: 'white'
  },
  conQR: {
    flex: 8,
    padding: 5
  },

});