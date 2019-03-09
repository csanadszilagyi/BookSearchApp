import { Component, OnInit, ElementRef, ChangeDetectorRef, 
  ChangeDetectionStrategy, Input } from '@angular/core';

interface ImgState {
  loaded?: boolean;
}

@Component({
  selector: 'app-thumb-img',
  templateUrl: './thumb-img.component.html',
  styleUrls: ['./thumb-img.component.scss']
})
export class ThumbImgComponent implements OnInit {

  readonly NO_THUMB_IMG_SRC: string = 'assets/no_cover_thumb.jpg';

  @Input() alt: string = '';

  _src: string = '';
  
  @Input()
  set src(src: string) {
    this._src = (src && src.trim()) || '';
    if (!this._src.length) {
      this.NO_THUMB_IMG_SRC;
    }
  }
 
  get src(): string { return this._src; }

  private state: ImgState = {
    loaded: false
  };

  constructor(private el: ElementRef, private cd: ChangeDetectorRef) {}

  ngOnInit() {
  }

  private setState(newState: ImgState) {
    this.state = {...this.state, ...newState};
  }

  onLoad(){
    this.setState({loaded: true});
  }

  onError() {
    this.src = this.NO_THUMB_IMG_SRC;
    this.setState({loaded: true});
  }


}
