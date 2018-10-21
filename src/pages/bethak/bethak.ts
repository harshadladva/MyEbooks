import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the BethakPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bethak',
  templateUrl: 'bethak.html',
})
export class BethakPage {

  image:string='';
  items: any = [];
  slider:any = [];
  loading:any;

  // tab1Root:string='HomePage';
  // tab2Root:string='HomePage';
  // tab3Root:string='HomePage';
  // tab4Root:string='HomePage';
  // tab5Root:string='HomePage';

  constructor(public navCtrl: NavController, private loadingCtrl:LoadingController,public navParams: NavParams, private database: AngularFireDatabase) {
    this.getData();
    this.getSliderImage();
  }

  presentLoadingDefault(): void {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Loading....'
    });
    this.loading.present();
  }

  getData(): void {
    this.database.list('/EcommerceApp/products/').valueChanges().subscribe((data) => {
      this.image = JSON.parse(JSON.stringify(data[0])).mainImage;
    });
  }

  getSliderImage():void{
    this.presentLoadingDefault();
    this.database.list('EcommerceApp/slider/').valueChanges().subscribe((data)=>{
      this.slider = data;
      this.loading.dismiss();
    });
  }



}
