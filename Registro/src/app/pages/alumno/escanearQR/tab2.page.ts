import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from '../../login/user.service';
import {
  BarcodeScanner,
  BarcodeFormat,
} from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  scanResult: string = '';
  username: string;
  public barcodes: any[] = [];
  selectedSegment: string = 'segment1';

  constructor(private angularFirestore: AngularFirestore, private userService: UserService) {
    this.username = this.userService.getUsername();
  }

  ngOnInit() {
    this.installGoogleBarcodeScannerModule();
  }

  private async installGoogleBarcodeScannerModule(): Promise<void> {
    try {
      await BarcodeScanner.installGoogleBarcodeScannerModule();
      const isModuleAvailable = await this.isGoogleBarcodeScannerModuleAvailable();
      if (!isModuleAvailable) {
      }
    } catch (error) {
    }
  }

  public async scan(): Promise<void> {
    try {
      if (await this.isGoogleBarcodeScannerModuleAvailable()) {
        const { barcodes } = await BarcodeScanner.scan({
          formats: [BarcodeFormat.QrCode],
        });
        this.barcodes = barcodes;

        if (this.barcodes.length > 0) {
          const scannedCode = this.barcodes[0].text;

          try {
            const { coleccion, documento } = JSON.parse(scannedCode);

            await this.updateFirebaseState(coleccion, documento);

            this.scanResult = 'Escaneo exitoso!!!!!!!';
          } catch (error) {
          }
        }
      } else {
      }
    } catch (error) {
    }
  }

  private async isGoogleBarcodeScannerModuleAvailable(): Promise<boolean> {
    try {
      const { available } = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
      return available;
    } catch (error) {
      return false;
    }
  }

  private async updateFirebaseState(coleccion: string, documento: string): Promise<void> {
    try {
      await this.angularFirestore.collection(coleccion).doc(documento).update({ estado: true });
    } catch (error) {
      throw error;
    }
  }
}
