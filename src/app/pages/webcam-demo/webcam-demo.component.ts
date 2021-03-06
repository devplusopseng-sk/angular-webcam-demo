import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ImgDtls } from 'src/app/model/ImgDtls';

@Component({
  selector: 'app-webcam-demo',
  templateUrl: './webcam-demo.component.html',
  styleUrls: ['./webcam-demo.component.css']
})
export class WebcamDemoComponent implements OnInit {

  imgDtls: ImgDtls = new ImgDtls();
  images: any = {};

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log(uuidv4());
  }

  openWebCamDialog(): void {
    console.log('Inside openWebCamDialog');
    const dialogRef = this.dialog.open(WebcamDialogComponent, {
      closeOnNavigation: true,
      maxWidth: '95vw',
      maxHeight: '90vh',
      width: '95%',
      height: '90%'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.confirmed) {
        console.log(result);
        var uuid = uuidv4();
        this.imgDtls.id = uuid;
        this.imgDtls.imgBase64 = result.imgData;
        this.images[uuid] = result.imgData;
      }
    });
  }

  previewImg(id: any): void {
    console.log('Inside previewImg');
    const windowOpen = window.open();
    windowOpen?.document.write('<img src="' + this.images[id] + '" style="height:100%;">');
    windowOpen?.stop();
  }

  deleteImg(id: any): void {
    console.log('Inside deleteImg');
    this.imgDtls.id = '';
    delete this.images[id];
  }

}

@Component({
  selector: 'app-webcam-dialog',
  templateUrl: './webcam-dialog.component.html',
  styleUrls: ['./webcam-demo.component.css']
})
export class WebcamDialogComponent {

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: any;
  public webcamImage: any;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  constructor(
    private dialogRef: MatDialogRef<WebcamDialogComponent>) {
  }

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    // this.pictureTaken.emit(webcamImage);
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  onConfirm(): void {
    var result: any;
    if (this.webcamImage) {
      result = {
        confirmed: true,
        imgData: this.webcamImage.imageAsDataUrl
      }
    } else {
      result = {
        confirmed: false,
      }
    }
    this.dialogRef.close(result);
  }

  onDismiss(): void {
    var result = {
      confirmed: false,
    }
    this.dialogRef.close(result);
  }
}

