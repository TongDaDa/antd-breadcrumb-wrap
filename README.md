# antd-breadcrumb-wrap


## feature
🚀🚀 It solves the binding relationship with antd breadcrumb navigation,
you need to provide the route data, to automatically update your bread
crumbs navigation

## use

```javascript
import BreadCrumbWrap from 'antd-breadcrumb-wrap"

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

const MatterLookAndEdit = ({match})=>{

  const defaultItemRender = (route, params, routes, paths) {
           const last = routes.indexOf(route) === routes.length - 1;
           return last ? <span>{route.breadcrumbName}</span> : <Link to={route.path}>{route.breadcrumbName}</Link>;
  }

  return (
     <BreadCrumbWrap
         routes={routes}
         match={match}
         itemRneder={defaultItemRender}
     />
  )
}

```

## API

| 参数         | 说明                                      | 类型         | 默认值 |
|-------------|------------------------------------------|-------------|-------|
| routes        | routes data | Array | refer below @routeData |
| match      | this.props.match | Object  | -   |
| itemRender    | render hook | Function  | -    |
| defaultBreadCrumb | defaultBreadCrumb  | Object,Array  | -    |

if you want to use it, limit your routes is above example, that is to say , your route data should contain children Array,
so with it form corresponding relations between

@routeData rule below :
This, of course, is a hierarchy, but it needs routes format is  one-dimensional the array,
so that meanings that if you have pursuing, may have to change it.

```javascript

const routes = [
        {
            name: '事项管理', component: Matter, path:"/matter", isExact: true,
            children: [
                {name: '查看', component: props => <MatterLookAndEdit {...props} type="look" />, path:"look/:id"},
                {name: '编辑', component: props => <MatterLookAndEdit {...props} type="edit" />, path:"edit/:id"},
            ]
        },
]

// from routes transform to ⬇️ ⬇️

routes = [
   {name: '事项管理', component: Matter, path:"/matter", isExact: true},
   {name: '编辑', component: props => <MatterLookAndEdit {...props} type="edit" />, path:"/matter/edit/:id"},
   {name: '查看', component: props => <MatterLookAndEdit {...props} type="look" />, path:"/matter/look/:id"},
]

```

`it just unfold it's children to one-dimensional the array. if you use react-router-dom may be you can only do so.`

## install

```
npm install antd-breadcrumb-wrap -save
```

## pull request

i'm very hopes someone give provide opinion, pull request in the repository.