/**
 * 观察者模式
 * 观察者模式是这样一种设计模式。一个被称作被观察者的对象，维护一组被称为观察者的对象，
 * 这些对象依赖于被观察者，被观察者自动将自身的状态的任何变化通知给它们。
 * 
 * 当一个被观察者需要将一些变化通知给观察者的时候，它将采用广播的方式，
 * 这条广播可能包含特定于这条通知的一些数据。
 * 
 */

function ObserverList() {
    this.observerList = [];
}

ObserverList.prototype.Add = function (obj) {
    return this.observerList.push(obj);
};

ObserverList.prototype.Empty = function () {
    this.observerList = [];
};

ObserverList.prototype.Count = function () {
    return this.observerList.length;
};


ObserverList.prototype.Get = function (index) {
    if (index > -1 && index < this.observerList.length) {
        return this.observerList[index];
    }
};

ObserverList.prototype.Insert = function (obj, index) {
    var pointer = -1;

    if (index === 0) {
        this.observerList.unshift(obj);
        pointer = index;
    } else if (index === this.observerList.length) {
        this.observerList.push(obj);
        pointer = index;
    }

    return pointer;
};

ObserverList.prototype.IndexOf = function (obj, startIndex) {
    var i = startIndex, pointer = -1;

    while (i < this.observerList.length) {
        if (this.observerList[i] === obj) {
            pointer = i;
        }
        i++;
    }

    return pointer;
};


ObserverList.prototype.RemoveAt = function (index) {
    if (index === 0) {
        this.observerList.shift();
    } else if (index === this.observerList.length - 1) {
        this.observerList.pop();
    }
};


// Extend an object with an extension
function extend(extension, obj) {
    for (var key in extension) {
        obj[key] = extension[key];
    }
}

function Subject() {
    this.observers = new ObserverList();
}

Subject.prototype.AddObserver = function (observer) {
    this.observers.Add(observer);
};

Subject.prototype.RemoveObserver = function (observer) {
    this.observers.RemoveAt(this.observers.IndexOf(observer, 0));
};

Subject.prototype.Notify = function (context) {
    var observerCount = this.observers.Count();
    for (var i = 0; i < observerCount; i++) {
        this.observers.Get(i).Update(context);
    }
};

// The Observer
function Observer() {
    this.Update = function () {
        // ...
    };
}

// 我们DOM 元素的引用

var controlCheckbox = document.getElementById("mainCheckbox"),
    addBtn = document.getElementById("addNewObserver"),
    container = document.getElementById("observersContainer");


// 具体的被观察者

//Subject 类扩展controlCheckbox 类
extend(new Subject(), controlCheckbox);

//点击checkbox 将会触发对观察者的通知
controlCheckbox["onclick"] = new Function("controlCheckbox.Notify(controlCheckbox.checked)");


addBtn["onclick"] = AddNewObserver;

// 具体的观察者

function AddNewObserver() {

    //建立一个新的用于增加的checkbox
    var check = document.createElement("input");
    check.type = "checkbox";

    // 使用Observer 类扩展checkbox
    extend(new Observer(), check);

    // 使用定制的Update函数重载
    check.Update = function (value) {
        this.checked = value;
    };

    // 增加新的观察者到我们主要的被观察者的观察者列表中
    controlCheckbox.AddObserver(check);

    // 将元素添加到容器的最后
    container.appendChild(check);
}