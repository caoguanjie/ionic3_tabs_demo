import { PageTransition,Animation } from 'ionic-angular';


/*--------------modal 从右边进入视图 --------------------- */
export class ModalFromRightEnter extends PageTransition{
    /**
     * 使用时发现Model打开的页面里ion-content标签的 ionScrollEnd 事件失效。
     * 追究后发现是ModalFromRightEnter里缺失super.init();。模仿ionic动画方法格式加上后就正常了。
     * 实际上，这个方法影响到了不少东西。 super.init()百度得到的结果大致是继承父类公共变量用的。与结果倒也相符。
     * 还有就是需要加个wrapper.beforeStyles({'opacity': 1});不然在我的APP（IONIC3.5.0）里是无法正常显示的。
     * 此外，为了ion-footer的正常显示，多加了一个const footerWrapper = new Animation(this.plt, ele.querySelector('ion-footer.footer')); footerWrapper.beforeStyles({'width': '80%'});
     * 
     * 经试验证明，在我ionic3.9.2版本下不需要为backdrop加默认的行内样式beforeStyles
     * 重点记住，easing()方法一定要放在duration()之前，如果两者调换位置，会导致程序在执行完动画之后延迟500毫秒才删除节点。
     * 如果先easing()后duration()，执行的顺序就是动画持续500毫秒，动画结束后，节点被删除，页面元素可以被点击。
     */
    public init(){
        super.init();
        const ele = this.enteringView.pageRef().nativeElement;
        const backdrop = new Animation(this.plt, ele.querySelector("ion-backdrop"));
        backdrop.beforeStyles({'z-index':'0', 'visibility': 'visible'});

        const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
        wrapper.beforeStyles({'opacity': 1});
        // wrapper.fromTo('transform', 'translateX(100%)', 'translateX(20%)');
        wrapper.fromTo('translateX', '100%', '20%');
        backdrop.fromTo('opacity', 0.01, 0.4);

        const contentWrapper = new Animation(this.plt, ele.querySelector('ion-content.content'));
        contentWrapper.beforeStyles({'width': '80%'});

        this
            .element(this.enteringView.pageRef())
            // .duration(500)
            .easing('cubic-bezier(0.36,0.66,0.04,1)')
            .duration(400)
            .add(backdrop)
            .add(wrapper)
            .add(contentWrapper); //加这个是为了在ion-content标签加上行内样式width
    }
}
/*--------------modal 从右边离开视图 --------------------- */
export class ModalFromRightLeave extends PageTransition{
    public init(){
        super.init();
        const ele = this.leavingView.pageRef().nativeElement;
        const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
        // backdrop.beforeStyles({'visibility': 'hidden'});

        const wrapperEle = ele.querySelector('.modal-wrapper');
        //getBoundingClientRect()这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。
        let wrapperEleRect = wrapperEle.getBoundingClientRect();
        const wrapper = new Animation(this.plt, wrapperEle);
        // wrapper.fromTo('transform', 'translateX(20%)', 'translateX(100%)');
        wrapper.fromTo('translateX', '20%', this.plt.height() - wrapperEleRect.top + "px");
        backdrop.fromTo('opacity', 0.4, 0.0);

        

        this
            .element(this.leavingView.pageRef)
            .easing('ease-out')
            .duration(400)
            .add(backdrop)
            .add(wrapper);
    }
}

/*--------------modal 模拟弹出框效果 从中间放大进入 --------------------- */
export class ModalScaleEnter extends PageTransition {
    public init() {
      super.init();
      const ele = this.enteringView.pageRef().nativeElement;
      const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
      backdrop.beforeStyles({'opacity':'0.5','visibility': 'visible','z-index':'0'});

      const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
      wrapper.beforeStyles({'opacity': 1});
      wrapper.fromTo('transform', 'scale(0.5)', 'scale(1)');
    //   const contentWrapper = new Animation(this.plt, ele.querySelector('ion-content.content'));
    //   contentWrapper.beforeStyles({'width':'50%', 'height':'50%','left': '25%', 'top':'20%'});

        
      this
        .element(this.enteringView.pageRef())
        // .easing('cubic-bezier(.1, .7, .1, 1)')
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(300)
        .add(backdrop)
        .add(wrapper)
        // .add(contentWrapper)
    }
  }
  /*--------------modal 从中间缩小离开 --------------------- */
  export class ModalScaleLeave extends PageTransition {
    public init() {
      super.init();
      const ele = this.leavingView.pageRef().nativeElement;
      const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
      backdrop.beforeStyles({'visibility': 'hidden'});
      const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
      wrapper.beforeStyles({'visibility': 'hidden'});
  
      this
        .element(this.leavingView.pageRef())
        // .duration(0)
        .add(backdrop)
        .add(wrapper);
    }
  }

