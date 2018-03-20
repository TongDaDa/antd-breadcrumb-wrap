import React, { createElement } from 'react';
import { Breadcrumb } from 'antd';
import {Link} from 'react-router-dom'

export default ({ match,routes=[],itemRender, defaultBreadCrumb, breadCrumbWrapOptions }) => {

    let breadCrumbWrapRoutes = [];

    if (!match) { throw new Error("your route match don't require in the breadCrumbWrap Component");  }

    /**
     * @nte: transform contain special meaning
     * @param routePath
     * @param stringPath
     * @return {StringPath || matchedRoutePath}
     */
    const transformRouteOtherMeans = (routePath) => {
        const patternList = [/^\:\w+$/]
        for (let i = 0; i < patternList.length; i++) {
            let pattern = patternList[i];
            const matched = pattern.exec(routePath)
            if (matched && matched.length > 0) {
                return matched.input
            }
            pattern.lastIndex = 0;
        }
        return ''
    }

    /**
     * @param0 alreadyPath?{String} exam : "/home/module1" || "layout/module/3"
     * @param1 meaningedList?{Aarray} exam :
     * @return route {Object || null}
     *
     */
    const getMatchRoutes = (alreadyPath,meaningedList) => {
        let filtered = routes.map(route => {
            const result = {};
            if (alreadyPath === route.path) {
                result.breadcrumbName = route.name;
                result.path = route.path;
                return result;
            }
        }).filter(i=>i)
        filtered = filtered.length > 0 ? filtered[0] : null

        if (filtered) {
            let n = -1;
            filtered.path = '/' + filtered.path.split('/')
                    .slice(1)
                    .map((routeChunkPath,k,t)=>{
                        const isMeaning = transformRouteOtherMeans(routeChunkPath);
                        if (isMeaning) { n++; return meaningedList[n]; }
                        return t[k]
                    })
                    .filter(i=>i)
                    .join("/")
        }
        return filtered;
    }

    /**
     * @param1 defaultCrumb?{Object | Array }
     * @note1  generate corresponding to each other of the two route of arrays.
     *         and use pattern rule split it's.
     * @note2
     * @return breadCrumbList {[{breadCrumbModule,....}]}
     */
    const getBreadcrumbList = (defaultCrumb) => {

        const {path,url} = match;
        const meaningedList = [];

        // @note 1
        const snippets_path = path.split("/").slice(1),
            snippets_url = url.split('/').slice(1)

        // @note2
        let breadCrumbList = defaultCrumb ? Array.isArray(defaultCrumb) ? [...defaultCrumb] : [defaultCrumb] : [],
            alreadyMatch = ''

        snippets_url.forEach((simplePath,index) => {
            //except situation for the path contain other mean
            //exam: "/look/:id"
            //currently route chunk path is contain other meaning....
            const meaning = transformRouteOtherMeans(snippets_path[index]);
            if (meaning) { alreadyMatch += '/'+snippets_path[index]; meaningedList.push(simplePath) }
            else { alreadyMatch+='/'+simplePath }
            console.log(alreadyMatch);
            const item = getMatchRoutes(alreadyMatch,meaningedList);
            if (item) breadCrumbList.push(item)
        })
        return breadCrumbList;
    }

    const defaultItemRender = (route, params, routes, paths)=>{
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? <span key={route.path}>{route.breadcrumbName}</span> : <Link key={route.path} to={route.path}>{route.breadcrumbName}</Link>;
    };

    return ( <Breadcrumb
            itemRender={itemRender || defaultItemRender}
            routes={getBreadcrumbList(defaultBreadCrumb)}
            {...breadCrumbWrapOptions}
        />
    );
};
