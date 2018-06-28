import { PageTransition,Animation } from 'ionic-angular';


/*--------------modal 从右边进入视图 --------------------- */
export class ModalFromRightEnter extends PageTransition{
    /**
     * 使用时发现Model打开的页面里ion-content标签的 ionScrollEnd 事件失效。
     * 追究后发现是ModalFromRightEnter里缺失super.init();。模仿ionic动画方法格式加上后就正常了。
     * 实际上，这个方法影响到了不少东西。 super.init()百度得到的结果大致是继承父类公共变量用的。与结果倒也相符。
     * 还有就是需要加个wrapper.beforeStyles({'opacity': 1});不然在我的APP（IONIC3.5.0）里是无法正常显示的。
     * 此外，为了ion-footer的正常显示，多加了一个const footerWrapper = new Animation(this.plt, ele.querySelector('ion-footer.footer')); footerWrapper.beforeStyles({'width': '80%'});
     */
    public init(){
        super.init();
        const ele = this.enteringView.pageRef().nativeElement;
        const backdrop = new Animation(this.plt, ele.querySelector("ion-backdrop"));
        backdrop.beforeStyles({'z-index':'0', 'opacity': '0.3', 'visibility': 'visible'});

        const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
        wrapper.beforeStyles({'opacity': 1});
        wrapper.fromTo('transform', 'translateX(100%)', 'translateX(20%)');

        const contentWrapper = new Animation(this.plt, ele.querySelector('ion-content.content'));
        contentWrapper.beforeStyles({'width': '80%'});

        this
            .element(this.enteringView.pageRef())
            .duration(500)
            .easing('cubic-bezier(0.36,0.66,0.04,1)')
            .add(backdrop)
            .add(wrapper)
            .add(contentWrapper);
    }
}
/*--------------modal 从右边离开视图 --------------------- */
export class ModalFromRightLeave extends PageTransition{
    public init(){
        super.init();
        const ele = this.leavingView.pageRef().nativeElement;
        const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
        backdrop.beforeStyles({'visibility': 'hidden'});

        const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
        wrapper.fromTo('transform', 'translateX(20%)', 'translateX(100%)');

        this
            .element(this.leavingView.pageRef)
            .duration(500)
            .easing('cubic-bezier(0.36,0.66,0.04,1)')
            .add(backdrop)
            .add(wrapper);
    }
}

/*--------------modal 从中间放大进入 --------------------- */
export class ModalScaleEnter extends PageTransition {
    public init() {
      super.init();
      const ele = this.enteringView.pageRef().nativeElement;
      const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
      wrapper.beforeStyles({ 'opacity': 1 });
      wrapper.fromTo('transform', 'scale(0)', 'scale(1)');
  
      this
        .element(this.enteringView.pageRef())
        .duration(400)
        .easing('cubic-bezier(.1, .7, .1, 1)')
        .add(wrapper);
    }
  }
  /*--------------modal 从中间缩小离开 --------------------- */
  export class ModalScaleLeave extends PageTransition {
    public init() {
      super.init();
      const ele = this.leavingView.pageRef().nativeElement;
      const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
      wrapper.fromTo('transform', 'scale(1)', 'scale(0)');
  
      this
        .element(this.leavingView.pageRef())
        .duration(400)
        .easing('cubic-bezier(.1, .7, .1, 1)')
        .add(wrapper);
    }
  }