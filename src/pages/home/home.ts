import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoaderProvider } from '../../providers/loader/loader';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  image = "../assets/imgs/placeholder_image.png";
  images = ["../assets/imgs/placeholder_image.png", "../assets/imgs/placeholder_image.png", "../assets/imgs/placeholder_image.png", "../assets/imgs/placeholder_image.png"];
  titles = ["Harshad", "Chetan Bhagat", "Guru Nanak Dev", "Welcome This book store", "Welcome Value"];
  names: string;
  bethak: any = [];
  items: any = [];
  slider:any = [];
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private loadingCtrl: LoadingController) {
    this.getData();
    this.getProducts();
    this.getSliderImage();
  }

  presentLoadingDefault(): void {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Loading....'
    });
    this.loading.present();
  }

  getSliderImage():void{
    this.presentLoadingDefault();
    this.database.list('EcommerceApp/slider/').valueChanges().subscribe((data)=>{
      this.slider = data;
      this.loading.dismiss();
    });
  }

  getData(): void {
    this.database.list('/EcommerceApp/products/').valueChanges().subscribe((data) => {
      this.items = data;
      console.log(this.items.length);
    });
  }

  getProducts(): void {
    this.database.list('/EcommerceApp/products/Bed/Products').valueChanges().subscribe((data) => {
      this.bethak = data;
    });
  }

}
