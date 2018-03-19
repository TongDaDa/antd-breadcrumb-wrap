# antd-breadcrumb-wrap

## use
```
import BreadCrumb from 'antd-breadcrumb-wrap"

..........some code

// routes ⬇️
const routes = [
      {
            name: '事项管理', component: Matter, path:"/matter", isExact: true,
            children: [
                {name: '查看', component: props => <MatterLookAndEdit {...props} type="look" />, path:"look/:id"},
                {name: '编辑', component: props => <MatterLookAndEdit {...props} type="edit" />, path:"edit/:id"},
            ]
        },
]

itemRender(route, params, routes, paths) {
   const last = routes.indexOf(route) === routes.length - 1;
   return last ? <span>{route.breadcrumbName}</span> : <Link to={route.path}>{route.breadcrumbName}</Link>;
}

<BreadCrumb routes={routes} location={this.props.location} itemRender={this.itemRender} ></BreadCrumb>

```


if you want to use it, limit your routes is above example, that is to say , your route data should contain children Array,
so with it form corresponding relations between

## API

| 参数         | 说明                                      | 类型         | 默认值 |
|-------------|------------------------------------------|-------------|-------|
| routes        | 路由数据 | Array |
| location      | 当前路由位置     | Object  | -    |
| itemRender    | 渲染钩子    | Function  | -    |


## install

```
cnpm | npm install antd-breadcrumb-wrap -S
```

## pull request

i'm