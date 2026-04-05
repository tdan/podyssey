import { AfterViewInit, Component, ElementRef, ViewChild, input, model } from "@angular/core";
import * as noUiSlider from "nouislider";
import { BehaviorSubject } from "rxjs";


// NoUiSlider events
const sliderEvents = [
  "start",
  "slide",
  "drag",
  "update",
  "change",
  "set",
  "end"
]


@Component({
  selector: "nouislider",
  standalone: true,
  templateUrl: "./nouislider.component.html",
  styleUrl: "./nouislider.component.css",
})
export class NoUiSliderComponent implements AfterViewInit {
  // Input()
  public start = input<number>(0);
  public minRange = input<number>(0);
  public maxRange = input<number>(0);
  public connect = input<"lower" | "upper" | boolean | boolean[]>("lower");
  public step = input<number>(0);
  public behavior = input<string>("tap");
  public cssPrefix = input<string | undefined>();
  public cssClasses = input<{}>({});


  @ViewChild("slider")
  private sliderRef!: ElementRef;

  private slider: noUiSlider.API | undefined;

  public value = model<number>();

  public continousState: BehaviorSubject<boolean>;

  constructor() {
    this.continousState = new BehaviorSubject<boolean>(true);
  }

  ngAfterViewInit() {
    let cssOverride = noUiSlider.cssClasses;

    for (const key of Object.keys(this.cssClasses()))
      cssOverride[key] = this.cssClasses()[key]

    this.slider = noUiSlider.create(
      this.sliderRef.nativeElement,
      {
        start: this.start(),
        range: {
          "min": this.minRange(),
          "max": this.maxRange(),
        },
        step: this.step(),
        connect: this.connect(),
        behaviour: this.behavior(),
        cssPrefix: this.cssPrefix(),
        cssClasses: cssOverride,
      }
    );

    this.slider?.on(
      "set",
      () => {
        console.log("[set-slider-value] " + this.get());
        this.value.update(newVal => Number(this.get()));
      }
    )
  }


  public get(): number {
    return Number(this.slider?.get().toString());
  }


  public set(val: number | [], fireSetEvent: boolean = true, ignoreStepping: boolean = false) {
    this.slider?.set(val, fireSetEvent, ignoreStepping);
  }


  public setHandle(
    handleNumber: number, val: number,
    fireSetEvent: false, ignoreStepping: false
  ) {
    this.slider?.setHandle(handleNumber, val, fireSetEvent, ignoreStepping);
  }

  public startContinous(incrementStep: number) {
  }


  public reset() {
    this.slider?.reset();
  }

}
