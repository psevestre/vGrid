import { HtmlCache } from './htmlCache';


export class MainScrollEvents {
  private element: Element;
  private timerLeft: number;
  private timerMain: number;
  private timerRight: number;
  private timerVhandle: number;
  private timerWheel: number;
  private timerHhandle: number;
  private lastTopPosition: number;
  private htmlCache: HtmlCache;
  private left: Element;
  private main: Element;
  private right: Element;
  private mainHead: Element;
  private vhandle: Element;
  private hhandle: Element;
  private group: Element;



  constructor(element, htmlCache) {
    this.element = element;
    this.htmlCache = htmlCache;
    this.timerLeft = null;
    this.timerMain = null;
    this.timerRight = null;
    this.timerVhandle = null;
    this.timerHhandle = null;
    this.timerWheel = null;
    this.lastTopPosition = 0;
  }

  public init(): void {

    this.updateInternalHtmlCache();
    this.addScrollEvents('all');

  }

  private updateInternalHtmlCache(): void {

    this.left = this.htmlCache.avg_content_left;
    this.main = this.htmlCache.avg_content_main;
    this.right = this.htmlCache.avg_content_right;
    this.mainHead = this.htmlCache.avg_header_main_scroll;
    this.vhandle = this.htmlCache.avg_content_vhandle;
    this.hhandle = this.htmlCache.avg_content_hhandle;
    this.group = this.htmlCache.avg_content_group;
    // this.scroll = this.htmlCache.avg_content_scroll;

  }


  private onWeel(event: MouseWheelEvent): boolean {

    if (this.vhandle.scrollHeight === (this.vhandle.parentNode as HTMLElement).clientHeight) {
      return false;
    }

    requestAnimationFrame(() => {
      // todo: do I bother to support IE11 for smooth scrolling with synced left/right/group?, 
      // if so I need to listen for onmousewheel and other event data...
      let deltaY = event.deltaY;
      if (event.deltaMode) {
        deltaY = deltaY * 40;
      }
      this.handleEventWheelScroll(deltaY);
    });
    event.preventDefault();
    return false;
  }


  private addScrollEvents(type: string): void {

    switch (type) {
      case 'all':
        (this.left as HTMLElement).onscroll = this.handleEventLeftScroll.bind(this);
        (this.main as HTMLElement).onscroll = this.handleEventMainScroll.bind(this);
        (this.right as HTMLElement).onscroll = this.handleEventRightScroll.bind(this);
        (this.right as HTMLElement).onwheel = this.onWeel.bind(this);
        (this.main as HTMLElement).onwheel = this.onWeel.bind(this);
        (this.left as HTMLElement).onwheel = this.onWeel.bind(this);
        (this.group as HTMLElement).onwheel = this.onWeel.bind(this);
        (this.vhandle as HTMLElement).onscroll = this.handleEventVhandle.bind(this);
        (this.hhandle as HTMLElement).onscroll = this.handleEventHhandle.bind(this);
        break;
      case 'left':
        (this.main as HTMLElement).onscroll = this.handleEventMainScroll.bind(this);
        (this.right as HTMLElement).onscroll = this.handleEventRightScroll.bind(this);
        (this.vhandle as HTMLElement).onscroll = this.handleEventVhandle.bind(this);
        break;
      case 'main':
        (this.left as HTMLElement).onscroll = this.handleEventLeftScroll.bind(this);
        (this.right as HTMLElement).onscroll = this.handleEventRightScroll.bind(this);
        (this.vhandle as HTMLElement).onscroll = this.handleEventVhandle.bind(this);
        break;
      case 'right':
        (this.left as HTMLElement).onscroll = this.handleEventLeftScroll.bind(this);
        (this.main as HTMLElement).onscroll = this.handleEventMainScroll.bind(this);
        (this.vhandle as HTMLElement).onscroll = this.handleEventVhandle.bind(this);
        break;
      case 'Vhandle':
        (this.left as HTMLElement).onscroll = this.handleEventLeftScroll.bind(this);
        (this.main as HTMLElement).onscroll = this.handleEventMainScroll.bind(this);
        (this.right as HTMLElement).onscroll = this.handleEventRightScroll.bind(this);
        break;
      case 'Hhandle':
        (this.main as HTMLElement).onscroll = this.handleEventMainScroll.bind(this);
        break;
      case 'wheel':
        (this.left as HTMLElement).onscroll = this.handleEventLeftScroll.bind(this);
        (this.main as HTMLElement).onscroll = this.handleEventMainScroll.bind(this);
        (this.right as HTMLElement).onscroll = this.handleEventRightScroll.bind(this);
        (this.vhandle as HTMLElement).onscroll = this.handleEventVhandle.bind(this);
        break;
      default:

    }
  }

  private removeScrollEvents(type): void {
    switch (type) {
      case 'all':
        (this.left as HTMLElement).onscroll = null;
        (this.main as HTMLElement).onscroll = null;
        (this.right as HTMLElement).onscroll = null;
        (this.vhandle as HTMLElement).onscroll = null;
        (this.group as HTMLElement).onscroll = null;
        break;
      case 'left':
        (this.main as HTMLElement).onscroll = null;
        (this.right as HTMLElement).onscroll = null;
        (this.vhandle as HTMLElement).onscroll = null;
        (this.group as HTMLElement).onscroll = null;
        break;
      case 'main':
        (this.left as HTMLElement).onscroll = null;
        (this.right as HTMLElement).onscroll = null;
        (this.vhandle as HTMLElement).onscroll = null;
        (this.group as HTMLElement).onscroll = null;
        break;
      case 'right':
        (this.left as HTMLElement).onscroll = null;
        (this.main as HTMLElement).onscroll = null;
        (this.vhandle as HTMLElement).onscroll = null;
        (this.group as HTMLElement).onscroll = null;
        break;
      case 'Vhandle':
        (this.left as HTMLElement).onscroll = null;
        (this.main as HTMLElement).onscroll = null;
        (this.right as HTMLElement).onscroll = null;
        (this.group as HTMLElement).onscroll = null;
        break;
      case 'Hhandle':
        (this.main as HTMLElement).onscroll = null;
        break;
      case 'wheel':
        (this.left as HTMLElement).onscroll = null;
        (this.main as HTMLElement).onscroll = null;
        (this.right as HTMLElement).onscroll = null;
        (this.vhandle as HTMLElement).onscroll = null;
        (this.group as HTMLElement).onscroll = null;
        break;
      default:
    }
  }


  private handleEventLeftScroll(): boolean {

    if (this.vhandle.scrollHeight === (this.vhandle.parentNode as HTMLElement).clientHeight) {
      return false;
    }

    requestAnimationFrame(() => {

      if (this.timerLeft) {
        clearTimeout(this.timerLeft);
        this.removeScrollEvents('left');
      }

      requestAnimationFrame(() => {
        let newTopPosition = this.left.scrollTop;
        this.right.scrollTop = newTopPosition;
        this.main.scrollTop = newTopPosition;
        this.vhandle.scrollTop = newTopPosition;
        this.group.scrollTop = newTopPosition;

        this.checkScroll(newTopPosition);

        this.timerLeft = setTimeout(() => {
          this.addScrollEvents('left');
          this.timerLeft = null;
        }, 30);
      });
    });

  }

  private handleEventWheelScroll(newTopPosition: number): void {
    requestAnimationFrame(() => {
      if (this.timerWheel) {
        clearTimeout(this.timerWheel);
        this.removeScrollEvents('wheel');
      }
      requestAnimationFrame(() => {
        this.main.scrollTop = this.main.scrollTop + newTopPosition;
        this.right.scrollTop = this.right.scrollTop + newTopPosition;
        this.left.scrollTop = this.left.scrollTop + newTopPosition;
        this.vhandle.scrollTop = this.vhandle.scrollTop + newTopPosition;
        this.group.scrollTop = this.group.scrollTop + newTopPosition;

        this.checkScroll(this.main.scrollTop);

        this.timerWheel = setTimeout(() => {
          this.addScrollEvents('wheel');
          this.timerWheel = null;
        }, 30);

      });

    });
  }

  private handleEventMainScroll(): boolean {

    if (this.vhandle.scrollHeight === (this.vhandle.parentNode as HTMLElement).clientHeight) {
      this.main.scrollTop = 0;
      let newLeftPosition = this.main.scrollLeft;
      (this.mainHead as HTMLElement).style.left = -newLeftPosition + 'px';
      return false;
    }

    requestAnimationFrame(() => {
      if (this.timerMain) {
        clearTimeout(this.timerMain);
        this.removeScrollEvents('main');
      }

      requestAnimationFrame(() => {
        let newTopPosition = this.main.scrollTop;
        this.right.scrollTop = newTopPosition;
        this.left.scrollTop = newTopPosition;
        this.vhandle.scrollTop = newTopPosition;
        this.group.scrollTop = newTopPosition;

        let newLeftPosition = this.main.scrollLeft;
        (this.mainHead as HTMLElement).style.left = -newLeftPosition + 'px';

        this.checkScroll(newTopPosition);

        this.timerMain = setTimeout(() => {
          this.addScrollEvents('main');
          this.timerMain = null;
        }, 30);
      });

    });

  }

  private handleEventRightScroll(): boolean {

    if (this.vhandle.scrollHeight === (this.vhandle.parentNode as HTMLElement).clientHeight) {
      return false;
    }

    requestAnimationFrame(() => {
      if (this.timerRight) {
        clearTimeout(this.timerRight);
        this.removeScrollEvents('right');
      }

      requestAnimationFrame(() => {
        let newTopPosition = this.right.scrollTop;
        this.left.scrollTop = newTopPosition;
        this.main.scrollTop = newTopPosition;
        this.vhandle.scrollTop = newTopPosition;
        this.group.scrollTop = newTopPosition;

        this.checkScroll(newTopPosition);

        this.timerRight = setTimeout(() => {
          this.addScrollEvents('right');
          this.timerRight = null;
        }, 30);
      });

    });

  }


  private handleEventVhandle(): void {


    requestAnimationFrame(() => {

      if (this.timerVhandle) {
        clearTimeout(this.timerVhandle);
        this.removeScrollEvents('Vhandle');
      }

      requestAnimationFrame(() => {
        let newTopPosition = this.vhandle.scrollTop;
        this.right.scrollTop = newTopPosition;
        this.main.scrollTop = newTopPosition;
        this.left.scrollTop = newTopPosition;
        this.group.scrollTop = newTopPosition;

        this.checkScroll(newTopPosition);

        this.timerVhandle = setTimeout(() => {
          this.addScrollEvents('Vhandle');
          this.timerVhandle = null;
        }, 30);
      });

    });

  }

  private handleEventHhandle(): void {


    requestAnimationFrame(() => {

      if (this.timerHhandle) {
        clearTimeout(this.timerHhandle);
        this.removeScrollEvents('Hhandle');
      }

      requestAnimationFrame(() => {
        let newLeftPosition = this.hhandle.scrollLeft;
        this.main.scrollLeft = newLeftPosition;
        (this.mainHead as HTMLElement).style.left = -newLeftPosition + 'px';

        // this.checkScroll(newTopPosition);
        this.timerHhandle = setTimeout(() => {
          this.addScrollEvents('Hhandle');
          this.timerHhandle = null;
        }, 30);

      });

    });


  }


  private checkScroll(newTopPosition: number): void {
    if (this.lastTopPosition !== newTopPosition) {

      // check is scroll bar scrolling
      let offset = Math.abs(this.lastTopPosition - newTopPosition);
      let isScrollBarScrolling = false;
      if (offset > 200) {
        isScrollBarScrolling = true;
      }

      // check is up or down
      let isDown = true;
      if (this.lastTopPosition > newTopPosition) {
        isDown = false;
      }

      // set last position
      this.lastTopPosition = newTopPosition;

      // trigger scroll
      this.triggerGridScrollEvent(isScrollBarScrolling, isDown, newTopPosition);
    }
  }


  private triggerGridScrollEvent(
    scrollbarScrolling: boolean,
    down: boolean,
    topPosition: number): void {

    let event = new CustomEvent('avg-scroll', {
      detail: {
        isScrollBarScrolling: scrollbarScrolling,
        isDown: down,
        newTopPosition: topPosition
      },
      bubbles: false
    });
    this.element.dispatchEvent(event);
  }


}