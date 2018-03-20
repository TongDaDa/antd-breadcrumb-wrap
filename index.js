'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (_ref) {
    var match = _ref.match,
        _ref$routes = _ref.routes,
        routes = _ref$routes === undefined ? [] : _ref$routes,
        itemRender = _ref.itemRender,
        defaultBreadCrumb = _ref.defaultBreadCrumb,
        breadCrumbWrapOptions = _ref.breadCrumbWrapOptions;


    var breadCrumbWrapRoutes = [];

    if (!match) {
        throw new Error("your route match don't require in the breadCrumbWrap Component");
    }

    /**
     * @nte: transform contain special meaning
     * @param routePath
     * @param stringPath
     * @return {StringPath || matchedRoutePath}
     */
    var transformRouteOtherMeans = function transformRouteOtherMeans(routePath) {
        var patternList = [/^\:\w+$/];
        for (var i = 0; i < patternList.length; i++) {
            var pattern = patternList[i];
            var matched = pattern.exec(routePath);
            if (matched && matched.length > 0) {
                return matched.input;
            }
            pattern.lastIndex = 0;
        }
        return '';
    };

    /**
     * @param0 alreadyPath?{String} exam : "/home/module1" || "layout/module/3"
     * @param1 meaningedList?{Aarray} exam :
     * @return route {Object || null}
     *
     */
    var getMatchRoutes = function getMatchRoutes(alreadyPath, meaningedList) {
        var filtered = routes.map(function (route) {
            var result = {};
            if (alreadyPath === route.path) {
                result.breadcrumbName = route.name;
                result.path = route.path;
                return result;
            }
        }).filter(function (i) {
            return i;
        });
        filtered = filtered.length > 0 ? filtered[0] : null;

        if (filtered) {
            var n = -1;
            filtered.path = '/' + filtered.path.split('/').slice(1).map(function (routeChunkPath, k, t) {
                var isMeaning = transformRouteOtherMeans(routeChunkPath);
                if (isMeaning) {
                    n++;return meaningedList[n];
                }
                return t[k];
            }).filter(function (i) {
                return i;
            }).join("/");
        }
        return filtered;
    };

    /**
     * @param1 defaultCrumb?{Object | Array }
     * @note1  generate corresponding to each other of the two route of arrays.
     *         and use pattern rule split it's.
     * @note2
     * @return breadCrumbList {[{breadCrumbModule,....}]}
     */
    var getBreadcrumbList = function getBreadcrumbList(defaultCrumb) {
        var path = match.path,
            url = match.url;

        var meaningedList = [];

        // @note 1
        var snippets_path = path.split("/").slice(1),
            snippets_url = url.split('/').slice(1);

        // @note2
        var breadCrumbList = defaultCrumb ? Array.isArray(defaultCrumb) ? [].concat(_toConsumableArray(defaultCrumb)) : [defaultCrumb] : [],
            alreadyMatch = '';

        snippets_url.forEach(function (simplePath, index) {
            //except situation for the path contain other mean
            //exam: "/look/:id"
            //currently route chunk path is contain other meaning....
            var meaning = transformRouteOtherMeans(snippets_path[index]);
            if (meaning) {
                alreadyMatch += '/' + snippets_path[index];meaningedList.push(simplePath);
            } else {
                alreadyMatch += '/' + simplePath;
            }
            console.log(alreadyMatch);
            var item = getMatchRoutes(alreadyMatch, meaningedList);
            if (item) breadCrumbList.push(item);
        });
        return breadCrumbList;
    };

    var defaultItemRender = function defaultItemRender(route, params, routes, paths) {
        var last = routes.indexOf(route) === routes.length - 1;
        return last ? _react2.default.createElement(
            'span',
            { key: route.path },
            route.breadcrumbName
        ) : _react2.default.createElement(
            _reactRouterDom.Link,
            { key: route.path, to: route.path },
            route.breadcrumbName
        );
    };

    return _react2.default.createElement(_antd.Breadcrumb, _extends({
        itemRender: itemRender || defaultItemRender,
        routes: getBreadcrumbList(defaultBreadCrumb)
    }, breadCrumbWrapOptions));
};
