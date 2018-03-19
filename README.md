# antd-breadcrumb-wrap

## use
```
import {routes} from '../../common/routes'
import BreadCrumb from 'antd-breadcrumb-wrap"

..........some code

itemRender(route, params, routes, paths) {
   const last = routes.indexOf(route) === routes.length - 1;
   return last ? <span>{route.breadcrumbName}</span> : <Link to={route.path}>{route.breadcrumbName}</Link>;
}

<BreadCrumb routes={routes} location={this.props.location} itemRender={this.itemRender} ></BreadCrumb>

```

## API

| 参数         | 说明                                      | 类型         | 默认值 |
|-------------|------------------------------------------|-------------|-------|
| routes        | 页面类型，若配置，则自带对应类型默认的 `title`，`desc`，`img`，此默认设置可以被 `title`，`desc`，`img` 覆盖 | Enum {'403', '404', '500'} | - |
| location      | 当前路由位置     | Object  | -    |
| itemRender    | 渲染钩子    | Function  | -    |


## install

```
cnpm | npm install antd-breadcrumb-wrap -S
```