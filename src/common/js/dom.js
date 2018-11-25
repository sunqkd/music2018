// 标签添加样式
// 添加 className
export function addClass(el, className) {
    if(hasClass(el,className)){
        console.log(el.className);
        return;
    }else{
        let newClass = el.className.split(' ');
        newClass.push(className);
        el.className = newClass.join(' ');
        console.log(el.className);
    }
    console.log(el.className);
}

export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
}
