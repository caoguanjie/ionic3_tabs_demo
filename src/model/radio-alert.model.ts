interface RadioAlert {
    title: string;
    radioArray: RadioAlertInputOptions[];
    type:string;//"radio" or "checkbox"
    isShowBtn:boolean; //是否显示按钮
    isRequired:boolean; //是不是必填
    okBtnText?: string;
    cancleBtnText?: string;
    enableBackdropDismiss?: boolean;//是否允许遮罩关闭弹窗
}

interface RadioAlertInputOptions {
    name:string;
    code:string;
    isSelected: boolean;
}