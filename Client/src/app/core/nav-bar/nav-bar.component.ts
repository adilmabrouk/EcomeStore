import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange , MediaObserver } from "@angular/flex-layout";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit , OnDestroy {

  mediaSub! : Subscription;
  deviceXs! : boolean;
  constructor(private mediaObserver : MediaObserver) {}

  ngOnInit(): void {
      this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
        // console.log(result.mqAlias);
        this.deviceXs = result.mqAlias === 'xs' || result.mqAlias === 'sm' ? true : false;
        // console.log(this.deviceXs);
      })
  }

  ngOnDestroy() :void {
    this.mediaSub.unsubscribe();
  }

}
