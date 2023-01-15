import { animate, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
interface Item {
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-my-gallery',
  templateUrl: './my-gallery.component.html',
  styleUrls: ['./my-gallery.component.scss'],
  animations:[
    trigger('animation', [
      transition('void => visible', [
        style({transform:'scale(0.5)'}),
        animate('150ms', style({transform:'scale(1)'}))
      ]),
      transition('visible => void', [
        style({transform:'scale(1)'}),
        animate('150ms', style({transform:'scale(0.5)'}))
      ])
    ])
  ]
})
export class MyGalleryComponent implements OnInit {
  @Input() galleryData: Item[] = [];
  @Input() showCount = false;

  prievewImage: boolean = false;
  showMask: boolean = false;
  currentLightboxImage: Item = this.galleryData[0];
  currentIndex: number = 0;
  controls: boolean = true;
  totalImageCount: number = 0;
  slideLeft: boolean = false;
  slideRight: boolean = false;

  constructor() {

  }
  ngOnInit(): void {
    this.totalImageCount = this.galleryData.length
  }
  onPreviewImage(index: number): void {
    console.log('previewImage', index)
    // show image preview
    this.showMask = true;
    this.prievewImage = true;
    this.currentIndex = index;
    this.currentLightboxImage = this.galleryData[index]
  }

  onPrev(){
    if(this.currentIndex !=0){
      this.slideRight = false;
      this.slideLeft = true;
      this.currentIndex = this.currentIndex -1
      this.currentLightboxImage = this.galleryData[this.currentIndex];
    }
  }

  onNext(){
    if( this.currentIndex != this.totalImageCount-1 ){
      this.slideLeft = false;
      this.slideRight = true;
      this.currentIndex = this.currentIndex +1
      this.currentLightboxImage = this.galleryData[this.currentIndex]


    }
  }

  onClose(){
    this.showMask = false;

    this.prievewImage = false;
  }

  onAnimationEnd(event:AnimationEvent){
    if( event.toState = 'void'){
      this.showMask = false;

    }
  }

}
