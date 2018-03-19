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
    
<BreadCrumb routes={routes} location={this.props.location} itemRender={} >
</BreadCrumb>

```

