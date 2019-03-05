import { Component, OnInit, ElementRef, ChangeDetectorRef, 
  ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { Statement } from '@angular/compiler';

@Component({
  selector: 'app-thumb-img',
  templateUrl: './thumb-img.component.html',
  styleUrls: ['./thumb-img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class ThumbImgComponent implements OnInit {

  @Input() src: string;
  @Input() alt: string;
  @Input() hasImage: boolean;

  private state: any = {
    visible: true, // not used
    loaded: false
  };

  constructor(private el: ElementRef, private cd: ChangeDetectorRef) {}

  ngOnInit() {
  }

  private setState(key, value) {
    this.state = {...this.state, [key]: value};
    this.cd.detectChanges();
  }

  onLoad(){
    this.setState('loaded', true);
  }

  onError() {
    console.log('img load error');
    this.setState('loaded', false);
  }


}
