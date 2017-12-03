### 安装
```
npm i task-layer --save
```

### 使用
```
import { Layer } from 'task-layer';
let a = new Layer();
```
#### 获得广播者

```
let a = new Layer();
a.getInformer();
```
#### 获得广播者

```
let a = new Layer();
a.getInformer();
```

#### 获得接受者

```
let a = new Layer();
a.getListener();
```
#### 接受者登记

```
let a = new Layer();
a.getListener().deal(<target>,<function>);
```
#### 广播者广播

```
let a = new Layer();
a.getInformer().send(<target>);
```
#### 广播者登记对接受者返回的信息进行处理

```
let a = new Layer();
a.getInformer().deal(<function(data,emit)>,<是否向上冒泡>);
```
#### 接受者完成后返回

```
let a = new Layer();
a.getListener().send(<data>);
```
#### 产生下层

```
let a = new Layer();
a.createSubLayer();
```
#### 手动向上层冒泡

```
let a = new Layer();
let b = a.createSubLayer();
b.responseToTopLayer(<res>);

```
### 例子

```
let a = new Layer();
a.getInformer().deal((res) =>{
    console.log(res,'这是首层处理');
});
a.getListener().deal('first',()=>{
    console.log('首层listener收到first的任务并开始工作')
})
a.getInformer().send('first');//首层发布first任务
a.getListener().send(777);//首层回复first任务的结果
let b = a.createSubLayer(); 
b.getInformer().deal((res,emit) =>{
    console.log(res,'这是次层处理');
    emit(res);//向上层冒泡本层结果
});
b.getListener().deal('aaa',()=>{
    console.log('次层收到aaa的任务并开始工作')
})
a.getInformer().send('aaa');//次层发布aaa任务
a.getListener().send(666);//次层回复aaa任务的结果
```