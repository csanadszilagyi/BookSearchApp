import { Component, OnInit, ElementRef, ChangeDetectorRef, 
  ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

interface ImgState {
  loaded?: boolean;
  visible?: boolean;
}

@Component({
  selector: 'app-thumb-img',
  templateUrl: './thumb-img.component.html',
  styleUrls: ['./thumb-img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class ThumbImgComponent implements OnInit {

  _src: string = '';
  @Input() alt: string = '';


  @Input()
  set src(src: string) {
    this._src = (src && src.trim()) || '';
    if (!this._src.length) {
      console.log('no src');
      this.setState({visible: false});
    }
  }
 
  get src(): string { return this._src; }

  private state: ImgState = {
    loaded: false,
    visible: false
  };

  constructor(private el: ElementRef, private cd: ChangeDetectorRef) {}

  ngOnInit() {
  }

  private setState(newState: ImgState) {
    this.state = {...this.state, ...newState};
    this.cd.detectChanges();
  }

  onLoad(){
    this.setState({loaded: true, visible: true});
  }

  onError() {
    this.setState({loaded: true, visible: false});
  }


}
