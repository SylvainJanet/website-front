import { APPUrisPaths } from '../../../../constants/APP/AppUrisPaths';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';
import { LogService } from 'src/services/log/log.service';
import { BreadCrumb } from 'src/interfaces/breadCrumb';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.css'],
})
export class BreadCrumbsComponent implements OnInit {
  breadcrumbs: BreadCrumb[];
  log: LogService;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private logService: LogService
  ) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    this.log = logService.withClassName(BreadCrumbsComponent.name);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      });
  }

  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Array<BreadCrumb> = []
  ): Array<BreadCrumb> {
    // If no routeConfig is avalailable we are on the root path
    let label = route.routeConfig?.data
      ? route.routeConfig.data.breadcrumb
      : APPUrisPaths.HOME_BREADCRUMB;
    let path = route.routeConfig?.path ? route.routeConfig.path : '';
    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart?.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart?.split(':')[1];
      path = path.replace(
        lastRoutePart ? lastRoutePart : '',
        route.snapshot.params[paramName ? paramName : '']
      );
      label = route.snapshot.params[paramName ? paramName : ''];
    }
    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;
    const breadcrumb = {
      label,
      url: nextUrl,
    };
    const newBreadcrumbs = breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs];
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
